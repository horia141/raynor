import { expect } from 'chai'
import 'mocha'

import { IdMarshaller } from './id';


describe('IdMarshaller', () => {
    const Ids = [
	1,
	103,
	23213131
    ];

    const NonIds = [
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
	for (let id of Ids) {
            it(`should parse ${id} `, () => {
		const idMarshaller = new IdMarshaller();
		
		expect(idMarshaller.extract(id)).to.equal(id);
            });
	}

	for (let nonId of NonIds) {
    	    it(`should throw for negative id ${nonId}`, () => {
    		const idMarshaller = new IdMarshaller();

    		expect(() => idMarshaller.extract(nonId)).to.throw('Expected a positive integer');
    	    });
	}

	for (let nonInteger of NonIntegers) {
    	    it(`should throw for float id ${nonInteger}`, () => {
    		const idMarshaller = new IdMarshaller();

    		expect(() => idMarshaller.extract(nonInteger)).to.throw('Expected an integer');
    	    });
	}        

	for (let nonNumeric of NonNumerics) {
    	    it(`should throw for ${JSON.stringify(nonNumeric)}`, () => {
    		const idMarshaller = new IdMarshaller();

    		expect(() => idMarshaller.extract(nonNumeric)).to.throw('Expected a number');
    	    });
	}
    });

    describe('pack', () => {
	for (let id of Ids) {
	    it(`should produce the same input for ${id}`, () => {
		const idMarshaller = new IdMarshaller();

		expect(idMarshaller.pack(id)).to.equal(id);
	    });
	}
    });

    describe('extract and pack', () => {
	for (let id of Ids) {
	    it(`should be opposites for ${id}`, () => {
		const idMarshaller = new IdMarshaller();

		const raw = id;
		const extracted = idMarshaller.extract(raw);
		const packed = idMarshaller.pack(extracted);

		expect(packed).to.equal(raw);
	    });
	}
    });
});
