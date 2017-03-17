import { expect } from 'chai'
import 'mocha'

import { UntypedArrayMarshaller, ArrayMarshaller } from './array'
import { BooleanMarshaller } from './boolean'


describe('UntypedArrayMarshaller', () => {
    const Arrays = [
        [],
        [1],
        [1, 2, 3],
        ['hello', 10, true],
        [null, null],
        [{a: 'more'}, {complicated: 'array'}, true]
    ];
    
    const NonArrays = [
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
	{},
	{hello: 20.2}
    ];
    
    describe('extract', () => {
        for (let array of Arrays) {
            it(`should extract ${JSON.stringify(array)}`, () => {
                const arrayMarshaller = new UntypedArrayMarshaller();

                expect(arrayMarshaller.extract(array)).to.eql(array);
            });
        }

        for (let nonArray of NonArrays) {
            it(`should throw for non-array ${JSON.stringify(nonArray)}`, () => {
                const arrayMarshaller = new UntypedArrayMarshaller();

                expect(() => arrayMarshaller.extract(nonArray)).to.throw('Expected an array');
            });
        }
    });

    describe('pack', () => {
        for (let array of Arrays) {
            it(`should produce the same input for ${JSON.stringify(array)}`, () => {
                const arrayMarshaller = new UntypedArrayMarshaller();

                expect(arrayMarshaller.pack(array)).to.eql(array);
            });
        }
    });

    describe('extract and pack', () => {
        for (let array of Arrays) {
            it(`should be opposites for ${JSON.stringify(array)}`, () => {
                const arrayMarshaller = new UntypedArrayMarshaller();

                const raw = array;
		const extracted = arrayMarshaller.extract(raw);
		const packed = arrayMarshaller.pack(extracted);

		expect(packed).to.eql(raw);
            });
        }
    });
});


describe('ArrayMarshaller', () => {
    const BooleanArrays = [
        [],
        [true, false],
        [true, true, false, true]
    ];

    const HeterogenousArrays = [
        [10],
        [true, 10, 1.2],
        [true, 'true', true],
        [null, true, false]
    ];

    const NonArrays = [
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
	{},
	{hello: 20.2}
    ];

    describe('extract', () => {
        for (let booleanArray of BooleanArrays) {
            it(`should parse ${JSON.stringify(booleanArray)}`, () => {
                const booleanMarshaller = new BooleanMarshaller();
                const arrayMarshaller = new ArrayMarshaller(booleanMarshaller);

                expect(arrayMarshaller.extract(booleanArray)).to.eql(booleanArray);
            });
        }

        for (let heterogenousArray of HeterogenousArrays) {
            it(`should throw for heterogenous array ${JSON.stringify(heterogenousArray)}`, () => {
                const booleanMarshaller = new BooleanMarshaller();
                const arrayMarshaller = new ArrayMarshaller(booleanMarshaller);

                expect(() => arrayMarshaller.extract(heterogenousArray)).to.throw('Expected a boolean');
            });
        }

        for (let nonArray of NonArrays) {
            it(`should throw for non-array ${JSON.stringify(nonArray)}`, () => {
                const booleanMarshaller = new BooleanMarshaller();
                const arrayMarshaller = new ArrayMarshaller(booleanMarshaller);

                expect(() => arrayMarshaller.extract(nonArray)).to.throw('Expected an array');
            });
        }
    });

    describe('pack', () => {
        for (let booleanArray of BooleanArrays) {
            it(`should produce the same input for ${JSON.stringify(booleanArray)}`, () => {
                const booleanMarshaller = new BooleanMarshaller();
                const arrayMarshaller = new ArrayMarshaller(booleanMarshaller);

                expect(arrayMarshaller.pack(booleanArray)).to.eql(booleanArray);
            });
        }
    });

    describe('extract and pack', () => {
        for (let booleanArray of BooleanArrays) {
            it(`should be opposites for ${booleanArray}`, () => {
                const booleanMarshaller = new BooleanMarshaller();
                const arrayMarshaller = new ArrayMarshaller(booleanMarshaller);

                const raw = booleanArray;
		const extracted = arrayMarshaller.extract(raw);
		const packed = arrayMarshaller.pack(extracted);

		expect(packed).to.eql(raw);
            });
        }
    });
});
