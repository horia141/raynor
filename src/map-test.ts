import { expect } from 'chai'
import 'mocha'

import { BooleanMarshaller } from './boolean'
import { IntegerMarshaller } from './number'
import { MapMarshaller } from './map'


describe('MapMarshaller', () => {
    const integerMarshaller = new IntegerMarshaller();
    const booleanMarshaller = new BooleanMarshaller();

    const Maps = [
        {
            raw: [],
            built: new Map<number, boolean>()
        },
        {
            raw: [[10, true], [20, false]],
            built: new Map<number, boolean>([[10, true], [20, false]])
        },
        {
            raw: [[10, true], [20, false], [-10, true]],
            built: new Map<number, boolean>([[10, true], [20, false], [-10, true]])
        }
    ];

    const NonMaps = [
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
    ];


    const NoSubarrays = [
        [10, true, 20, false],
        [[10, true], 20, false]
    ];

    const BadLengthSubarrays = [
        [[10, true, 20], [false]],
        [[10, true], [20, false, 30]]
    ];

    const BadKeysBadValues = [
        [[10, 'true'], [20, 'false']],
        [[10, true], [20, 30]],
        [[true, 10], [20, false]]
    ];

    describe('extract', () => {
        for (let { raw, built } of Maps) {
            it(`should extract ${JSON.stringify(raw)}`, () => {
                const mapMarshaller = new MapMarshaller(integerMarshaller, booleanMarshaller);
                expect(mapMarshaller.extract(raw)).to.eql(built);
            })
        }


        for (let nonMap of NonMaps) {
            it(`should throw for ${JSON.stringify(nonMap)}`, () => {
                const mapMarshaller = new MapMarshaller(integerMarshaller, booleanMarshaller);

                expect(() => mapMarshaller.extract(nonMap)).to.throw('Expected an array');
            });
        }

        for (let badCase of NoSubarrays) {
            it(`should throw for ${JSON.stringify(badCase)}`, () => {
                const mapMarshaller = new MapMarshaller(integerMarshaller, booleanMarshaller);

                expect(() => mapMarshaller.extract(badCase)).to.throw('Expected element to be an array');
            });
        }

        for (let badCase of BadLengthSubarrays) {
            it(`should throw for ${JSON.stringify(badCase)}`, () => {
                const mapMarshaller = new MapMarshaller(integerMarshaller, booleanMarshaller);

                expect(() => mapMarshaller.extract(badCase)).to.throw('Expected array element to be a pair');
            });
        }

        for (let badCase of BadKeysBadValues) {
            it(`should throw for ${JSON.stringify(badCase)}`, () => {
                const mapMarshaller = new MapMarshaller(integerMarshaller, booleanMarshaller);

                expect(() => mapMarshaller.extract(badCase)).to.throw;
            });
        }
    });

    describe('pack', () => {
        for (let { raw, built } of Maps) {
            it(`should produce the same input for ${JSON.stringify(raw)}`, () => {
                const mapMarshaller = new MapMarshaller(integerMarshaller, booleanMarshaller);
                expect(mapMarshaller.pack(built)).to.eql(raw);
            });
        }
    });

    describe('extract and pack', () => {
        for (let { raw } of Maps) {
            it(`should be opposites for ${JSON.stringify(raw)}`, () => {
                const mapMarshaller = new MapMarshaller(integerMarshaller, booleanMarshaller);

                const extracted = mapMarshaller.extract(raw);
                const packed = mapMarshaller.pack(extracted);

                expect(packed).to.eql(raw);
            })
        }
    });
});


// describe('MapMarshaller', () => {
//     const Maps = [
//         {},
//         { a: true, b: false },
//         { ax: true, bx: true, cx: false, dx: true }
//     ];

//     const HeterogenousMaps = [
//         { a: 'true' },
//         { a: true, b: 'false' },
//         { a: true, b: { ax: true } }
//     ];

//     const NonMaps = [
//         10,
//         31.23,
//         null,
//         undefined,
//         NaN,
//         Number.POSITIVE_INFINITY,
//         Number.NEGATIVE_INFINITY,
//         true,
//         false,
//         'hello',
//         '100',
//         [],
//         [true, true, false]
//     ];

//     describe('extract', () => {
//         for (let map of Maps) {
//             it(`should extract ${JSON.stringify(map)}`, () => {
//                 const booleanMarshaller = new BooleanMarshaller();
//                 const mapMarshaller = new MapMarshaller(booleanMarshaller);

//                 expect(mapMarshaller.extract(map)).to.eql(map);
//             });
//         }

//         for (let heterogenousMap of HeterogenousMaps) {
//             it(`should throw for heterogenous map ${JSON.stringify(heterogenousMap)}`, () => {
//                 const booleanMarshaller = new BooleanMarshaller();
//                 const mapMarshaller = new MapMarshaller(booleanMarshaller);

//                 expect(() => mapMarshaller.extract(heterogenousMap)).to.throw('Expected a boolean');
//             });
//         }

//         for (let nonMap of NonMaps) {
//             it(`should throw for ${JSON.stringify(nonMap)}`, () => {
//                 const booleanMarshaller = new BooleanMarshaller();
//                 const mapMarshaller = new MapMarshaller(booleanMarshaller);

//                 expect(() => mapMarshaller.extract(nonMap)).to.throw('Expected an object');
//             });
//         }
//     });

//     describe('pack', () => {
//         for (let map of Maps) {
//             it(`should produce the same input for ${JSON.stringify(map)}`, () => {
//                 const booleanMarshaller = new BooleanMarshaller();
//                 const mapMarshaller = new MapMarshaller(booleanMarshaller);

//                 expect(mapMarshaller.pack(map)).to.eql(map);
//             });
//         }
//     });

//     describe('extract and pack', () => {
//         for (let map of Maps) {
//             it(`should be opposites ${JSON.stringify(map)}`, () => {
//                 const booleanMarshaller = new BooleanMarshaller();
//                 const mapMarshaller = new MapMarshaller(booleanMarshaller);

//                 const raw = map;
//                 const extracted = mapMarshaller.extract(raw);
//                 const packed = mapMarshaller.pack(extracted);

//                 expect(packed).to.eql(raw);
//             });
//         }
//     });
// });
