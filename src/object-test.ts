import { expect } from 'chai'
import 'mocha'

import { IdMarshaller } from './id'
import { IntegerMarshaller, NumberMarshaller } from './number'
import { ObjectMarshaller, UntypedObjectMarshaller, MarshalSchema } from './object'
import { OptionalMarshaller } from './optional'
import { StringMarshaller } from './string'


describe('UntypedObjectMarshaller', () => {
    class Point {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        sumCoords(): number {
            return this.x + this.y;
        }
    }

    const Objects = [
        {},
        { a: 'hello', b: 'world' },
        new Point(10, 20)
    ];

    const NonObjects = [
        10,
        31.23,
        null,
        undefined,
        NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        true,
        false,
        'hello',
        '100',
        [],
        [true, true, false]
    ];

    describe('extract', () => {
        for (const object of Objects) {
            it(`should extract ${JSON.stringify(object)}`, () => {
                const objectMarshaller = new UntypedObjectMarshaller();
                const extracted = objectMarshaller.extract(object);

                expect(extracted).to.eql(object);
                expect(extracted).to.not.have.ownProperty('sumCoords');
            });
        }

        for (const nonObject of NonObjects) {
            it(`should throw for ${JSON.stringify(nonObject)}`, () => {
                const objectMarshaller = new UntypedObjectMarshaller();

                expect(() => objectMarshaller.extract(nonObject)).to.throw('Expected an object');
            });
        }
    });

    describe('pack', () => {
        for (const object of Objects) {
            it(`should produce the same input for ${JSON.stringify(object)}`, () => {
                const objectMarshaller = new UntypedObjectMarshaller();

                expect(objectMarshaller.pack(object)).to.eql(object);
            });
        }
    });

    describe('extract and pack', () => {
        for (const object of Objects) {
            it(`should be opposites for ${JSON.stringify(object)}`, () => {
                const objectMarshaller = new UntypedObjectMarshaller();

                const raw = object;
                const extracted = objectMarshaller.extract(raw);
                const packed = objectMarshaller.pack(extracted);

                expect(packed).to.eql(raw);
            });
        }
    });
});


describe('ObjectMarshaller', () => {
    class Point {
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        coordsSum(): number {
            return this.x + this.y;
        }
    }

    const PointSchema: MarshalSchema<Point> = {
        x: { marshaller: new NumberMarshaller() },
        y: { marshaller: new NumberMarshaller() }
    };

    const Points = [
        [{ x: 10, y: 20 }, new Point(10, 20), 30],
        [{ x: 11, y: 22 }, new Point(11, 22), 33],
        [{ x: 12, y: 24, z: 36 }, new Point(12, 24), 36]
    ];

    const NonPoints = [
        [{ x: 10 }, 'Field y is missing'],
        [{ y: 20 }, 'Field x is missing'],
        [{ x: 'hello' }, 'Expected a number']
    ];

    class Point3D {
        x: number;
        y: number;
        z: number;

        constructor(x: number, y: number, z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }

    const Point3DSchema: MarshalSchema<Point3D> = {
        x: { marshaller: new NumberMarshaller() },
        y: { marshaller: new NumberMarshaller() },
        z: { marshaller: new NumberMarshaller(), sourcePropName: 'the_z' }
    };

    const Points3D = [
        [{ x: 10, y: 20, the_z: 30 }, new Point3D(10, 20, 30)],
        [{ x: 11, y: 22, the_z: 33 }, new Point3D(11, 22, 33)]
    ];

    const NonPoint3Ds = [
        [{ x: 10, y: 20, z: 30 }, 'Field the_z is missing'],
    ];

    class User {
        id: number;
        name: string;
        age: number;

        homePosition: Point;
        officePosition: Point | null;
        language: string | null;

        constructor(id: number, name: string, age: number, homePosition: Point, officePosition?: Point, language?: string) {
            this.id = id;
            this.name = name;
            this.age = age;
            this.homePosition = homePosition;
            if (typeof officePosition == 'undefined') {
                this.officePosition = null;
            } else {
                this.officePosition = officePosition;
            }
            if (typeof language == 'undefined') {
                this.language = null;
            } else {
                this.language = language;
            }
        }
    }

    const UserSchema: MarshalSchema<User> = {
        id: { marshaller: new IdMarshaller() },
        name: { marshaller: new StringMarshaller() },
        age: { marshaller: new IntegerMarshaller() },
        homePosition: { marshaller: new ObjectMarshaller<Point>(Point, PointSchema) },
        officePosition: { marshaller: new OptionalMarshaller<Point>(new ObjectMarshaller<Point>(Point, PointSchema)) },
        language: { marshaller: new OptionalMarshaller<string>(new StringMarshaller()), sourcePropName: 'lang' }
    };

    const Users = [
        [{ id: 1, name: 'John', age: 21, homePosition: { x: 0, y: 20 }, officePosition: { x: 10, y: 20 }, lang: 'en-US' },
        new User(1, 'John', 21, new Point(0, 20), new Point(10, 20), 'en-US')],
        [{ id: 2, name: 'Jane', age: 22, homePosition: { x: 10, y: 30 } },
        new User(2, 'Jane', 22, new Point(10, 30))],
        [{ id: 3, name: 'Harry', age: 24, homePosition: { x: 100, y: 300 }, money: 1000 },
        new User(3, 'Harry', 24, new Point(100, 300))],
    ];

    const NonUsers = [
        [{ id: 1, name: 'John', age: 21 },
            'Field homePosition is missing'],
        [{ id: 'hello', name: 'John', age: 21, homePosition: { x: 0, y: 20 } },
            'Expected a number'],
        [{ id: 1, name: 'John', age: 21, homePosition: 10 },
            'Expected an object'],
        [{ id: 1, name: 'John', age: 21, homePosition: { x: 0 } },
            'Field y is missing']
    ];

    const NonObjects = [
        10,
        31.23,
        null,
        undefined,
        NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        true,
        false,
        'hello',
        '100',
        [],
        [true, true, false]
    ];

    describe('constructor', () => {
        it(`should throw for undefined marshaller`, () => {
            expect(() => new ObjectMarshaller<Point>(Point, { x: undefined })).to.throw('Cannot accept undefined as a marshaller for x');
        });
    });

    describe('extract', () => {
        for (const [raw, point, coordsSum] of Points) {
            it(`should extract ${JSON.stringify(raw)}`, () => {
                const pointMarshaller = new ObjectMarshaller<Point>(Point, PointSchema);
                const extracted: Point = pointMarshaller.extract(raw);

                expect(extracted).to.be.an.instanceof(Point);
                expect(extracted).to.eql(point);
                expect(extracted.coordsSum()).to.eql(coordsSum);
            });
        }

        for (const [raw, point3D] of Points3D) {
            it(`should extract ${JSON.stringify(raw)}`, () => {
                const point3DMarshaller = new ObjectMarshaller<Point3D>(Point3D, Point3DSchema);
                const extracted: Point3D = point3DMarshaller.extract(raw);

                expect(extracted).to.be.an.instanceof(Point3D);
                expect(extracted).to.eql(point3D);
            });
        }

        for (const [raw, user] of Users) {
            it(`should extract ${JSON.stringify(raw)}`, () => {
                const userMarshaller = new ObjectMarshaller<User>(User, UserSchema);
                const extracted: User = userMarshaller.extract(raw);

                expect(extracted).to.be.an.instanceof(User);
                expect(extracted).to.eql(user);
            });
        }

        for (const [raw, message] of NonPoints) {
            it(`should throw for non-point ${JSON.stringify(raw)}`, () => {
                const pointMarshaller = new ObjectMarshaller<Point>(Point, PointSchema);

                expect(() => pointMarshaller.extract(raw)).to.throw(message as string);
            });
        }

        for (const [raw, message] of NonPoint3Ds) {
            it(`should throw for non-point3D ${JSON.stringify(raw)}`, () => {
                const point3DMarshaller = new ObjectMarshaller<Point3D>(Point3D, Point3DSchema);

                expect(() => point3DMarshaller.extract(raw)).to.throw(message as string);
            });
        }

        for (const [raw, message] of NonUsers) {
            it(`should throw for non-user ${JSON.stringify(raw)}`, () => {
                const userMarshaller = new ObjectMarshaller<User>(User, UserSchema);

                expect(() => userMarshaller.extract(raw)).to.throw(message as string);
            });
        }

        for (const nonObject of NonObjects) {
            it(`should throw for ${JSON.stringify(nonObject)}`, () => {
                const pointMarshaller = new ObjectMarshaller<Point>(Point, PointSchema);
                const userMarshaller = new ObjectMarshaller<User>(User, UserSchema);

                expect(() => pointMarshaller.extract(nonObject)).to.throw('Expected an object');
                expect(() => userMarshaller.extract(nonObject)).to.throw('Expected an object');
            });
        }

        it(`should throw when a marshaller becomes undefined`, () => {
            const newSchema = (Object as any).assign({}, PointSchema);
            const pointMarshaller = new ObjectMarshaller<Point>(Point, newSchema);
            const modifiableSchema = newSchema as any;
            modifiableSchema.y = undefined;

            expect(() => pointMarshaller.extract(Points[0][0] as any)).to.throw('Should never happen');
        });
    });

    describe('pack', () => {
        for (const [raw, point, _] of Points) {
            it(`should pack ${JSON.stringify(point)}`, () => {
                const pointMarshaller = new ObjectMarshaller<Point>(Point, PointSchema);
                const getAroundTypesRaw = raw as any;

                expect(pointMarshaller.pack(point as Point)).to.eql({ x: getAroundTypesRaw.x, y: getAroundTypesRaw.y });
            });
        }

        for (const [raw, point3D] of Points3D) {
            it(`should pack ${JSON.stringify(point3D)}`, () => {
                const point3DMarshaller = new ObjectMarshaller<Point3D>(Point3D, Point3DSchema);
                const getAroundTypesRaw = raw as any;

                expect(point3DMarshaller.pack(point3D as Point3D)).to.eql({ x: getAroundTypesRaw.x, y: getAroundTypesRaw.y, the_z: getAroundTypesRaw.the_z });
            });
        }

        for (const [raw, user] of Users) {
            it(`should pack ${JSON.stringify(user)}`, () => {
                const userMarshaller = new ObjectMarshaller<User>(User, UserSchema);
                const packed = userMarshaller.pack(user as User);

                expect(packed.id).to.eql(raw.id);
                expect(packed.name).to.eql(raw.name);
                expect(packed.age).to.eql(raw.age);
                expect(packed.homePosition).to.eql(raw.homePosition);
                expect(packed.officePosition).to.eql((raw as any).officePosition);
            });
        }

        it(`should throw when a marshaller becomes undefined`, () => {
            const newSchema = (Object as any).assign({}, PointSchema);
            const pointMarshaller = new ObjectMarshaller<Point>(Point, newSchema);
            const modifiableSchema = newSchema as any;
            modifiableSchema.y = undefined;

            expect(() => pointMarshaller.pack(Points[0][1] as Point)).to.throw('Should never happen');
        });
    });

    describe('extract and pack', () => {
        for (const [raw, _, __] of Points) {
            it(`should be opposites for ${JSON.stringify(raw)}`, () => {
                const pointMarshaller = new ObjectMarshaller<Point>(Point, PointSchema);
                const getAroundTypesRaw = raw as any;

                const extracted = pointMarshaller.extract(raw);
                const packed = pointMarshaller.pack(extracted);

                expect(packed).to.eql({ x: getAroundTypesRaw.x, y: getAroundTypesRaw.y });
            });
        }

        for (const [raw, _] of Points3D) {
            it(`should be opposites for ${JSON.stringify(raw)}`, () => {
                const point3DMarshaller = new ObjectMarshaller<Point3D>(Point3D, Point3DSchema);
                const getAroundTypesRaw = raw as any;

                const extracted = point3DMarshaller.extract(raw);
                const packed = point3DMarshaller.pack(extracted);

                expect(packed).to.eql({ x: getAroundTypesRaw.x, y: getAroundTypesRaw.y, the_z: getAroundTypesRaw.the_z });
            });
        }

        for (const [raw, _] of Users) {
            it(`should be opposites for ${JSON.stringify(raw)}`, () => {
                const userMarshaller = new ObjectMarshaller<User>(User, UserSchema);

                const extracted = userMarshaller.extract(raw);
                const packed = userMarshaller.pack(extracted);

                expect(packed.id).to.eql(raw.id);
                expect(packed.name).to.eql(raw.name);
                expect(packed.age).to.eql(raw.age);
                expect(packed.homePosition).to.eql(raw.homePosition);
                expect(packed.officePosition).to.eql((raw as any).officePosition);
            });
        }
    });
});
