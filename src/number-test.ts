import { expect } from 'chai'
import 'mocha'

import { IntegerMarshaller, NumberMarshaller, PositiveIntegerMarshaller } from './number';


describe('NumberMarshaller', () => {
    const Numbers = [
        1,
        10,
        -54,
        4.3,
        893.2
    ];
    
    const NonNumbers = [
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
	[100],
	{},
	{hello: 20.2}
    ];

    describe('extract', () => {
        for (let number of Numbers) {
            it(`should parse ${number}`, () => {
                const numberMarshaller = new NumberMarshaller();

                expect(numberMarshaller.extract(number)).to.equal(number);
            });
        }

        for (let nonNumber of NonNumbers) {
            it(`should throw for ${JSON.stringify(nonNumber)}`, () => {
                const numberMarshaller = new NumberMarshaller();

                expect(() => numberMarshaller.extract(nonNumber)).to.throw('Expected a number');
            });
        }
    });

    describe('pack', () => {
        for (let number of Numbers) {
            it(`should produce the same input for ${number}`, () => {
                const numberMarshaller = new NumberMarshaller();

                expect(numberMarshaller.pack(number)).to.equal(number);
            });
        }
    });

    describe('extract and pack', () => {
        for (let number of Numbers) {
            it(`should be opposites for ${number}`, () => {
                const numberMarshaller = new NumberMarshaller();

                const raw = number;
		const extracted = numberMarshaller.extract(raw);
		const packed = numberMarshaller.pack(extracted);

		expect(packed).to.equal(raw);
            });
        }
    });
});


describe('IntegerMarshaller', () => {
    const Integers = [
        1,
        3
        -5,
        20
    ];

    const NonIntegers = [
        1.2,
        -3.14,
        1.3941e+3
    ];

    const NonNumerics = [
	null,
	undefined,
	NaN,
	Number.POSITIVE_INFINITY,
	Number.NEGATIVE_INFINITY,
	'hello',
	'100',
	[],
	[100],
	{},
	{hello: 100}
    ];

    describe('extract', () => {
        for (let integer of Integers) {
            it(`should parse ${integer}`, () => {
                const integerMarshaller = new IntegerMarshaller();

                expect(integerMarshaller.extract(integer)).to.equal(integer);
            });
        }

        for (let nonInteger of NonIntegers) {
            it(`should throw for float ${nonInteger}`, () => {
                const integerMarshaller = new IntegerMarshaller();

                expect(() => integerMarshaller.extract(nonInteger)).to.throw('Expected an integer');
            });
        }

        for (let nonNumeric of NonNumerics) {
            it(`should throw for ${nonNumeric}`, () => {
                const integerMarshaller = new IntegerMarshaller();

                expect(() => integerMarshaller.extract(nonNumeric)).to.throw('Expected a number');
            });
        }        
    });

    describe('pack', () => {
        for (let integer of Integers) {
            it(`should produce the same input for ${integer}`, () => {
                const integerMarshaller = new IntegerMarshaller();

                expect(integerMarshaller.pack(integer)).to.equal(integer);
            });
        }
    });

    describe('extract and pack', () => {
        for (let integer of Integers) {
            it(`should be opposites for ${integer}`, () => {
                const integerMarshaller = new IntegerMarshaller();

                const raw = integer;
		const extracted = integerMarshaller.extract(raw);
		const packed = integerMarshaller.pack(extracted);

		expect(packed).to.equal(raw);
            });
        }
    });
});


describe('PositiveIntegerMarshaller', () => {
    const PositiveIntegers = [
	1,
	103,
	23213131
    ];

    const NonPositiveIntegers = [
        0,
        -1,
        -312
    ];

    const NonIntegers = [
        1.41,
        -3.12
    ];

    const NonNumerics = [
	null,
	undefined,
	NaN,
	Number.POSITIVE_INFINITY,
	Number.NEGATIVE_INFINITY,
	'hello',
	'100',
	[],
	[100],
	{},
	{hello: 100}
    ];
    
    describe('extract', () => {
	for (let id of PositiveIntegers) {
            it(`should parse ${id} `, () => {
		const idMarshaller = new PositiveIntegerMarshaller();
		
		expect(idMarshaller.extract(id)).to.equal(id);
            });
	}

	for (let nonPositiveInteger of NonPositiveIntegers) {
    	    it(`should throw for negative id ${nonPositiveInteger}`, () => {
    		const idMarshaller = new PositiveIntegerMarshaller();

    		expect(() => idMarshaller.extract(nonPositiveInteger)).to.throw('Expected a positive integer');
    	    });
	}

	for (let nonInteger of NonIntegers) {
    	    it(`should throw for float id ${nonInteger}`, () => {
    		const idMarshaller = new PositiveIntegerMarshaller();

    		expect(() => idMarshaller.extract(nonInteger)).to.throw('Expected an integer');
    	    });
	}        

	for (let nonNumeric of NonNumerics) {
    	    it(`should throw for ${JSON.stringify(nonNumeric)}`, () => {
    		const idMarshaller = new PositiveIntegerMarshaller();

    		expect(() => idMarshaller.extract(nonNumeric)).to.throw('Expected a number');
    	    });
	}
    });

    describe('pack', () => {
	for (let id of PositiveIntegers) {
	    it(`should produce the same input for ${id}`, () => {
		const idMarshaller = new PositiveIntegerMarshaller();

		expect(idMarshaller.pack(id)).to.equal(id);
	    });
	}
    });

    describe('extract and pack', () => {
	for (let id of PositiveIntegers) {
	    it(`should be opposites for ${id}`, () => {
		const idMarshaller = new PositiveIntegerMarshaller();

		const raw = id;
		const extracted = idMarshaller.extract(raw);
		const packed = idMarshaller.pack(extracted);

		expect(packed).to.equal(raw);
	    });
	}
    });
});
