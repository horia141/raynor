import { expect } from 'chai'
import * as moment from 'moment'
import 'mocha'

import { MomentFromTsMarshaller } from './moment';


describe('MomentFromTsMarshaller', () => {
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
        for (const dateTs of DatesTs) {
            it(`should parse ${new Date(dateTs).toISOString()}`, () => {
                const marshaller = new MomentFromTsMarshaller();

                expect(marshaller.extract(dateTs).isValid()).to.be.true;
                expect(marshaller.extract(dateTs).valueOf()).to.eql(dateTs);
                expect(marshaller.extract(dateTs).utcOffset()).to.eql(0);
            });
        }

        for (const nonPositiveTs of NonPositiveTs) {
            it(`should throw for negative ${nonPositiveTs}`, () => {
                const marshaller = new MomentFromTsMarshaller();

                expect(() => marshaller.extract(nonPositiveTs)).to.throw('Expected a positive timestamp');
            });
        }

        for (const nonInteger of NonIntegers) {
            it(`should throw for float ${nonInteger}`, () => {
                const marshaller = new MomentFromTsMarshaller();

                expect(() => marshaller.extract(nonInteger)).to.throw('Expected an integer');
            });
        }

        for (const nonDateTs of NonDatesTs) {
            it(`should throw for ${JSON.stringify(nonDateTs)}`, () => {
                const marshaller = new MomentFromTsMarshaller();

                expect(() => marshaller.extract(nonDateTs)).to.throw('Expected a number');
            });
        }
    });

    describe('pack', () => {
        for (const dateTs of DatesTs) {
            it(`should produce the same input for ${new Date(dateTs).toISOString()}`, () => {
                const marshaller = new MomentFromTsMarshaller();

                expect(marshaller.pack(moment(dateTs).utc())).to.equal(dateTs);
            });
        }
    });

    describe('extract and pack', () => {
        for (const dateTs of DatesTs) {
            it(`should be opposites for ${new Date(dateTs).toISOString()}`, () => {
                const marshaller = new MomentFromTsMarshaller();

                const raw = dateTs;
                const extracted = marshaller.extract(raw);
                const packed = marshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});
