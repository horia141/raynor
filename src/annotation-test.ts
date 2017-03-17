import { expect } from 'chai'
import 'mocha'

import { ArrayMarshaller} from './array'
import { ExtractError } from './core'
import { EnumMarshaller } from './enum'
import { IdMarshaller } from './id'
import { MapMarshaller} from './map'
import { IntegerMarshaller, NumberMarshaller } from './number'
import { OptionalMarshaller } from './optional'
import { ArrayOf, MapOf, MarshalFrom, MarshalEnum, MarshalWith, OptionalOf } from './annotation'
import { StringMarshaller } from './string'


describe('OptionalOf', () => {
    it('should create an OptionalMarshaller', () => {
        const marshaller = new (OptionalOf(NumberMarshaller));

        expect(marshaller).to.be.an.instanceof(OptionalMarshaller);
    });
});


describe('ArrayOf', () => {
    it('should create an ArrayMarshaller', () => {
        const marshaller = new (ArrayOf(NumberMarshaller));

        expect(marshaller).to.be.an.instanceof(ArrayMarshaller);
    });
});


describe('MapOf', () => {
    it('should create an MapMarshaller', () => {
        const marshaller = new (MapOf(NumberMarshaller));

        expect(marshaller).to.be.an.instanceof(MapMarshaller);
    });
});


describe('MarshalEnum', () => {
    enum Role {
	Unknown = 0,
	Regular = 1,
	Admin = 2
    };
    
    it('should create an EnumMarshaller', () => {
	const marshaller = new (MarshalEnum(Role));

	expect(marshaller).to.be.an.instanceof(EnumMarshaller);
    });
});


describe('Annotations', () => {
    class Point {
        @MarshalWith(NumberMarshaller)
        x: number;

        @MarshalWith(NumberMarshaller)
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        coordsSum(): number {
            return this.x + this.y;
        }
    }

    const Points = [
        [{x: 10, y: 20}, new Point(10, 20), 30],
        [{x: 11, y: 22}, new Point(11, 22), 33],
        [{x: 12, y: 24, z: 36}, new Point(12, 24), 36]
    ];

    const NonPoints = [
        [{x: 10}, 'Field y is missing'],
        [{y: 20}, 'Field x is missing'],
        [{x: 'hello'}, 'Expected a number']
    ];

    class User {
        @MarshalWith(IdMarshaller)
	id: number;

        @MarshalWith(StringMarshaller)
	name: string;

        @MarshalWith(IntegerMarshaller)
	age: number;

        @MarshalWith(MarshalFrom(Point))
	homePosition: Point;

        @MarshalWith(OptionalOf(MarshalFrom(Point)))
	officePosition: Point|null;

	constructor(id: number, name: string, age: number, homePosition: Point, officePosition?: Point) {
	    this.id = id;
	    this.name = name;
	    this.age = age;
	    this.homePosition = homePosition;
	    if (typeof officePosition == 'undefined') {
		this.officePosition = null;
	    } else {
		this.officePosition = officePosition;
	    }
	}
    }

    const Users = [
	[{id: 1, name: 'John', age: 21, homePosition: {x: 0, y: 20}, officePosition: {x: 10, y: 20}},
	 new User(1, 'John', 21, new Point(0, 20), new Point(10, 20))],
	[{id: 2, name: 'Jane', age: 22, homePosition: {x: 10, y: 30}},
	 new User(2, 'Jane', 22, new Point(10, 30))],
	[{id: 3, name: 'Harry', age: 24, homePosition: {x: 100, y: 300}, money: 1000},
	 new User(3, 'Harry', 24, new Point(100, 300))],	
    ];

    const NonUsers = [
        [{id: 1, name: 'John', age: 21},
         'Field homePosition is missing'],
        [{id: 'hello', name: 'John', age: 21, homePosition: {x: 0, y: 20}},
         'Expected a number'],
        [{id: 1, name: 'John', age: 21, homePosition: 10},
         'Expected an object'],
        [{id: 1, name: 'John', age: 21, homePosition: {x: 0}},
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

    describe('extract', () => {
        for (let [raw, point, coordsSum] of Points) {
            it(`should extract ${JSON.stringify(raw)}`, () => {
                const pointMarshaller = new (MarshalFrom<Point>(Point));
                const extracted: Point = pointMarshaller.extract(raw);

                expect(extracted).to.be.an.instanceof(Point);
                expect(extracted).to.eql(point);
                expect(extracted.coordsSum()).to.eql(coordsSum);
            });
        }

	for (let [raw, user] of Users) {
	    it(`should extract ${JSON.stringify(raw)}`, () => {
		const userMarshaller = new (MarshalFrom<User>(User));
		const extracted: User = userMarshaller.extract(raw);

                expect(extracted).to.be.an.instanceof(User);
                expect(extracted).to.eql(user);
	    });
	}

        for (let [raw, message] of NonPoints) {
            it(`should throw for non-point ${JSON.stringify(raw)}`, () => {
                const pointMarshaller = new (MarshalFrom<Point>(Point));

                expect(() => pointMarshaller.extract(raw)).to.throw(message as string);
            });
        }

        for (let [raw, message] of NonUsers) {
            it(`should throw for non-user ${JSON.stringify(raw)}`, () => {
                const userMarshaller = new (MarshalFrom<User>(User));

                expect(() => userMarshaller.extract(raw)).to.throw(message as string);
            });
        }

        for (let nonObject of NonObjects) {
            it(`should throw for ${JSON.stringify(nonObject)}`, () => {
                const pointMarshaller = new (MarshalFrom<Point>(Point));
                const userMarshaller = new (MarshalFrom<User>(User));

                expect(() => pointMarshaller.extract(nonObject)).to.throw('Expected an object');
                expect(() => userMarshaller.extract(nonObject)).to.throw('Expected an object');
            });
        }
    });

    describe('pack', () => {
	for (let [raw, point, _] of Points) {
	    it(`should pack ${JSON.stringify(point)}`, () => {
		const pointMarshaller = new (MarshalFrom<Point>(Point));
		const getAroundTypesRaw = raw as any;

		expect(pointMarshaller.pack(point as Point)).to.eql({x: getAroundTypesRaw.x, y: getAroundTypesRaw.y});
	    });
	}

	for (let [raw, user] of Users) {
	    it(`should pack ${JSON.stringify(user)}`, () => {
		const userMarshaller = new (MarshalFrom<User>(User));
		const packed = userMarshaller.pack(user as User);

		expect(packed.id).to.eql(raw.id);
		expect(packed.name).to.eql(raw.name);
		expect(packed.age).to.eql(raw.age);
		expect(packed.homePosition).to.eql(raw.homePosition);

		if ((user as User).officePosition != null) {
		    expect(packed.officePosition).to.eql((raw as any).officePosition);
		} else {
		    expect(packed.officePosition).to.be.null;
		}
	    });
	}
    });

    describe('extract and pack', () => {
        for (let [raw, _, __] of Points) {
            it(`should be opposites for ${JSON.stringify(raw)}`, () => {
                const pointMarshaller = new (MarshalFrom<Point>(Point));
                const getAroundTypesRaw = raw as any;

		const extracted = pointMarshaller.extract(raw);
		const packed = pointMarshaller.pack(extracted);

		expect(packed).to.eql({x: getAroundTypesRaw.x, y: getAroundTypesRaw.y});
            });
        }

        for (let [raw, user] of Users) {
            it(`should be opposites for ${JSON.stringify(raw)}`, () => {
                const userMarshaller = new (MarshalFrom<User>(User));

		const extracted = userMarshaller.extract(raw);
		const packed = userMarshaller.pack(extracted);

                expect(packed.id).to.eql(raw.id);
		expect(packed.name).to.eql(raw.name);
		expect(packed.age).to.eql(raw.age);
		expect(packed.homePosition).to.eql(raw.homePosition);

		if ((user as User).officePosition != null) {
		    expect(packed.officePosition).to.eql((raw as any).officePosition);
		} else {
		    expect(packed.officePosition).to.be.null;
		}
            });
        }
    });

    class SuperUserMarshaller extends MarshalFrom(User) {
        filter(user: User): User {
            if (user.id >= 3) {
                throw new ExtractError('Expected id to be lower than 2');
            }

            return user;
        }
    }

    describe('Derived marshaller', () => {
        it('should work', () => {
            const superUserMarshaller = new SuperUserMarshaller();

            expect(superUserMarshaller.extract(Users[0][0])).to.eql(Users[0][1] as User);
            expect(() => superUserMarshaller.extract(Users[2][0])).to.throw('Expected id to be lower than 2');
        });
    });

    class Color {
        red: number;
        green: number;
        blue: number;
    }

    describe('No schema', () => {
        it('should produce an object with null fields', () => {
            const colorMarshaller = new (MarshalFrom(Color));

            expect(colorMarshaller.extract({red: 10, green: 20, blue: 30})).to.eql(new Color());
        });
    });
});
