import { expect } from 'chai'
import 'mocha'

import { OneOf2Marshaller, OneOf3Marshaller, OneOf4Marshaller } from './one-of'
import {
    Point2,
    APoint2Marshaller,
    Point3,
    APoint3Marshaller,
    Point4,
    APoint4Marshaller,
    Point5,
    Point5Marshaller
} from './points'


describe('OneOf2Marshaller', () => {
    const Points = [
        [{ e1: { x: 10, y: 20 } }, new Point2(10, 20)],
        [{ e2: { x: 10, y: 20, z: 30 } }, new Point3(10, 20, 30)],
        [{ e1: { x: 100, y: 200 } }, new Point2(100, 200)],
        [{ e2: { x: 100, y: 200, z: 300 } }, new Point3(100, 200, 300)],
    ];

    const NonPoints = [
        { e1: { a: 10, b: 20 } },
        { e2: { x: 10, y: 20 } },
        { e1: 'foo' },
        { e2: Number.POSITIVE_INFINITY }
    ];

    const NonOneOf2s = [
        { x: 10, y: 20 },
        { x: 10, y: 20, z: 30 }
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
        for (const [coded, expected] of Points) {
            it(`should parse ${coded}`, () => {
                const pointMarshaller = new OneOf2Marshaller(APoint2Marshaller, APoint3Marshaller);

                expect(pointMarshaller.extract(coded)).to.eql(expected);
            });
        }

        for (const nonPoint of NonPoints) {
            it(`should throw for ${JSON.stringify(nonPoint)}`, () => {
                const pointMarshaller = new OneOf2Marshaller(APoint2Marshaller, APoint3Marshaller);

                expect(() => pointMarshaller.extract(nonPoint)).to.throw;
            });
        }

        for (const nonOneOf2 of NonOneOf2s) {
            it(`should throw for ${JSON.stringify(nonOneOf2)}`, () => {
                const pointMarshaller = new OneOf2Marshaller(APoint2Marshaller, APoint3Marshaller);

                expect(() => pointMarshaller.extract(nonOneOf2)).to.throw('Expected a one-of-2 object');
            });
        }

        for (const nonObject of NonObjects) {
            it(`should throw for ${JSON.stringify(nonObject)}`, () => {
                const pointMarshaller = new OneOf2Marshaller(APoint2Marshaller, APoint3Marshaller);

                expect(() => pointMarshaller.extract(nonObject)).to.throw('Expected an object');
            });
        }
    });

    describe('pack', () => {
        for (const [point, cooked] of Points) {
            it(`should produce the same input for ${point}`, () => {
                const pointMarshaller = new OneOf2Marshaller(APoint2Marshaller, APoint3Marshaller);

                expect(pointMarshaller.pack(cooked as Point2 | Point3)).to.eql(point);
            });
        }
    });

    describe('extract and pack', () => {
        for (const [point, _] of Points) {
            it(`should be opposites for ${point}`, () => {
                const pointMarshaller = new OneOf2Marshaller(APoint2Marshaller, APoint3Marshaller);

                const raw = point;
                const extracted = pointMarshaller.extract(raw);
                const packed = pointMarshaller.pack(extracted);

                expect(packed).to.eql(raw);
            });
        }
    });
});


describe('OneOf3Marshaller', () => {
    const Points = [
        [{ e1: { x: 10, y: 20 } }, new Point2(10, 20)],
        [{ e2: { x: 10, y: 20, z: 30 } }, new Point3(10, 20, 30)],
        [{ e3: { x: 10, y: 20, z: 30, w: 40 } }, new Point4(10, 20, 30, 40)],
        [{ e1: { x: 100, y: 200 } }, new Point2(100, 200)],
        [{ e2: { x: 100, y: 200, z: 300 } }, new Point3(100, 200, 300)],
        [{ e3: { x: 100, y: 200, z: 300, w: 400 } }, new Point4(100, 200, 300, 400)]
    ];

    const NonPoints = [
        { e1: { a: 10, b: 20 } },
        { e2: { x: 10, y: 20 } },
        { e1: 'foo' },
        { e2: Number.POSITIVE_INFINITY }
    ];

    const NonOneOf3s = [
        { x: 10, y: 20 },
        { x: 10, y: 20, z: 30 }
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
        for (const [coded, expected] of Points) {
            it(`should parse ${coded}`, () => {
                const pointMarshaller = new OneOf3Marshaller(APoint2Marshaller, APoint3Marshaller, APoint4Marshaller);

                expect(pointMarshaller.extract(coded)).to.eql(expected);
            });
        }

        for (const nonPoint of NonPoints) {
            it(`should throw for ${JSON.stringify(nonPoint)}`, () => {
                const pointMarshaller = new OneOf3Marshaller(APoint2Marshaller, APoint3Marshaller, APoint4Marshaller);

                expect(() => pointMarshaller.extract(nonPoint)).to.throw;
            });
        }

        for (const nonOneOf3 of NonOneOf3s) {
            it(`should throw for ${JSON.stringify(nonOneOf3)}`, () => {
                const pointMarshaller = new OneOf3Marshaller(APoint2Marshaller, APoint3Marshaller, APoint4Marshaller);

                expect(() => pointMarshaller.extract(nonOneOf3)).to.throw('Expected a one-of-3 object');
            });
        }

        for (const nonObject of NonObjects) {
            it(`should throw for ${JSON.stringify(nonObject)}`, () => {
                const pointMarshaller = new OneOf3Marshaller(APoint2Marshaller, APoint3Marshaller, APoint4Marshaller);

                expect(() => pointMarshaller.extract(nonObject)).to.throw('Expected an object');
            });
        }
    });

    describe('pack', () => {
        for (const [point, cooked] of Points) {
            it(`should produce the same input for ${point}`, () => {
                const pointMarshaller = new OneOf3Marshaller(APoint2Marshaller, APoint3Marshaller, APoint4Marshaller);

                expect(pointMarshaller.pack(cooked as Point2 | Point3)).to.eql(point);
            });
        }
    });

    describe('extract and pack', () => {
        for (const [point, _] of Points) {
            it(`should be opposites for ${point}`, () => {
                const pointMarshaller = new OneOf3Marshaller(APoint2Marshaller, APoint3Marshaller, APoint4Marshaller);

                const raw = point;
                const extracted = pointMarshaller.extract(raw);
                const packed = pointMarshaller.pack(extracted);

                expect(packed).to.eql(raw);
            });
        }
    });
});


describe('OneOf4Marshaller', () => {
    const Points = [
        [{ e1: { x: 10, y: 20 } }, new Point2(10, 20)],
        [{ e2: { x: 10, y: 20, z: 30 } }, new Point3(10, 20, 30)],
        [{ e3: { x: 10, y: 20, z: 30, w: 40 } }, new Point4(10, 20, 30, 40)],
        [{ e4: { x: 10, y: 20, z: 30, w: 40, m: 50 } }, new Point5(10, 20, 30, 40, 50)],
        [{ e1: { x: 100, y: 200 } }, new Point2(100, 200)],
        [{ e2: { x: 100, y: 200, z: 300 } }, new Point3(100, 200, 300)],
        [{ e3: { x: 100, y: 200, z: 300, w: 400 } }, new Point4(100, 200, 300, 400)],
        [{ e4: { x: 100, y: 200, z: 300, w: 400, m: 500 } }, new Point5(100, 200, 300, 400, 500)]
    ];

    const NonPoints = [
        { e1: { a: 10, b: 20 } },
        { e2: { x: 10, y: 20 } },
        { e1: 'foo' },
        { e2: Number.POSITIVE_INFINITY }
    ];

    const NonOneOf4s = [
        { x: 10, y: 20 },
        { x: 10, y: 20, z: 30 }
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
        for (const [coded, expected] of Points) {
            it(`should parse ${coded}`, () => {
                const pointMarshaller = new OneOf4Marshaller(APoint2Marshaller, APoint3Marshaller, APoint4Marshaller, Point5Marshaller);

                expect(pointMarshaller.extract(coded)).to.eql(expected);
            });
        }

        for (const nonPoint of NonPoints) {
            it(`should throw for ${JSON.stringify(nonPoint)}`, () => {
                const pointMarshaller = new OneOf4Marshaller(APoint2Marshaller, APoint3Marshaller, APoint4Marshaller, Point5Marshaller);

                expect(() => pointMarshaller.extract(nonPoint)).to.throw;
            });
        }

        for (const nonOneOf4 of NonOneOf4s) {
            it(`should throw for ${JSON.stringify(nonOneOf4)}`, () => {
                const pointMarshaller = new OneOf4Marshaller(APoint2Marshaller, APoint3Marshaller, APoint4Marshaller, Point5Marshaller);

                expect(() => pointMarshaller.extract(nonOneOf4)).to.throw('Expected a one-of-4 object');
            });
        }

        for (const nonObject of NonObjects) {
            it(`should throw for ${JSON.stringify(nonObject)}`, () => {
                const pointMarshaller = new OneOf4Marshaller(APoint2Marshaller, APoint3Marshaller, APoint4Marshaller, Point5Marshaller);

                expect(() => pointMarshaller.extract(nonObject)).to.throw('Expected an object');
            });
        }
    });

    describe('pack', () => {
        for (const [point, cooked] of Points) {
            it(`should produce the same input for ${point}`, () => {
                const pointMarshaller = new OneOf4Marshaller(APoint2Marshaller, APoint3Marshaller, APoint4Marshaller, Point5Marshaller);

                expect(pointMarshaller.pack(cooked as Point2 | Point3)).to.eql(point);
            });
        }
    });

    describe('extract and pack', () => {
        for (const [point, _] of Points) {
            it(`should be opposites for ${point}`, () => {
                const pointMarshaller = new OneOf4Marshaller(APoint2Marshaller, APoint3Marshaller, APoint4Marshaller, Point5Marshaller);

                const raw = point;
                const extracted = pointMarshaller.extract(raw);
                const packed = pointMarshaller.pack(extracted);

                expect(packed).to.eql(raw);
            });
        }
    });
});
