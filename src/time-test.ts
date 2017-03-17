import { expect } from 'chai'
import 'mocha'

import { TimeMarshaller } from './time';


describe('TimeMarshaller', () => {
    const DatesTs = [
	Date.UTC(2017, 1, 17, 11),
	Date.UTC(2017, 1, 17, 11, 22, 33),
	Date.UTC(2017, 1, 17, 11, 22, 33, 123)
    ];

    const NonPositiveTs = [
        -4,
        -3,
	-1
    ];

    const NonIntegers = [
	3.15,
        -4.1231
    ];

    const NonDatesTs = [
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
	for (let dateTs of DatesTs) {
            it(`should parse ${new Date(dateTs).toISOString()}`, () => {
		const timeMarshaller = new TimeMarshaller();
		
		expect(timeMarshaller.extract(dateTs).getTime()).to.equal(new Date(dateTs).getTime());
            });
	}

	for (let nonPositiveTs of NonPositiveTs) {
	    it(`should throw for negative ${nonPositiveTs}`, () => {
		const timeMarshaller = new TimeMarshaller();

		expect(() => timeMarshaller.extract(nonPositiveTs)).to.throw('Expected a positive timestamp');
	    });
	}

	for (let nonInteger of NonIntegers) {
	    it(`should throw for float ${nonInteger}`, () => {
		const timeMarshaller = new TimeMarshaller();

		expect(() => timeMarshaller.extract(nonInteger)).to.throw('Expected an integer');
	    });
	}

	for (let nonDateTs of NonDatesTs) {
    	    it(`should throw for ${JSON.stringify(nonDateTs)}`, () => {
    		const timeMarshaller = new TimeMarshaller();

    		expect(() => timeMarshaller.extract(nonDateTs)).to.throw('Expected a number');
    	    });
	}
    });

    describe('pack', () => {
	for (let dateTs of DatesTs) {
    	    it(`should produce the same input for ${new Date(dateTs).toISOString()}`, () => {
    		const timeMarshaller = new TimeMarshaller();

    		expect(timeMarshaller.pack(new Date(dateTs))).to.equal(dateTs);
    	    });
	}
    });

    describe('extract and pack', () => {
	for (let dateTs of DatesTs) {
    	    it(`should be opposites for ${new Date(dateTs).toISOString()}`, () => {
    		const timeMarshaller = new TimeMarshaller();

    		const raw = dateTs;
    		const extracted = timeMarshaller.extract(raw);
    		const packed = timeMarshaller.pack(extracted);

    		expect(packed).to.equal(raw);
    	    });
	}
    });
});
