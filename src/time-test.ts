import { expect } from 'chai'
import 'mocha'

import { DateMarshaller, DateFromTsMarshaller } from './time';


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
        for (const dateTs of DatesTs) {
            it(`should parse ${new Date(dateTs).toISOString()}`, () => {
                const timeMarshaller = new DateFromTsMarshaller();

                expect(timeMarshaller.extract(dateTs).getTime()).to.equal(new Date(dateTs).getTime());
            });
        }

        for (const nonPositiveTs of NonPositiveTs) {
            it(`should throw for negative ${nonPositiveTs}`, () => {
                const timeMarshaller = new DateFromTsMarshaller();

                expect(() => timeMarshaller.extract(nonPositiveTs)).to.throw('Expected a positive timestamp');
            });
        }

        for (const nonInteger of NonIntegers) {
            it(`should throw for float ${nonInteger}`, () => {
                const timeMarshaller = new DateFromTsMarshaller();

                expect(() => timeMarshaller.extract(nonInteger)).to.throw('Expected an integer');
            });
        }

        for (const nonDateTs of NonDatesTs) {
            it(`should throw for ${JSON.stringify(nonDateTs)}`, () => {
                const timeMarshaller = new DateFromTsMarshaller();

                expect(() => timeMarshaller.extract(nonDateTs)).to.throw('Expected a number');
            });
        }
    });

    describe('pack', () => {
        for (const dateTs of DatesTs) {
            it(`should produce the same input for ${new Date(dateTs).toISOString()}`, () => {
                const timeMarshaller = new DateFromTsMarshaller();

                expect(timeMarshaller.pack(new Date(dateTs))).to.equal(dateTs);
            });
        }
    });

    describe('extract and pack', () => {
        for (const dateTs of DatesTs) {
            it(`should be opposites for ${new Date(dateTs).toISOString()}`, () => {
                const timeMarshaller = new DateFromTsMarshaller();

                const raw = dateTs;
                const extracted = timeMarshaller.extract(raw);
                const packed = timeMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});


describe('DateMarshaller', () => {
    const Dates: Date[] = [
        new Date(Date.UTC(2017, 1, 17, 11)),
        new Date(Date.UTC(2017, 1, 17, 11, 22, 33)),
        new Date(Date.UTC(2017, 1, 17, 11, 22, 33, 123))
    ];

    const NonDates = [
        null,
        undefined,
        NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        'hello',
        '100',
        2000,
        10023,
        [],
        [100],
        {},
        {hello: 100}
    ];

    describe('extract', () => {
        for (const date of Dates) {
            it(`should parse ${date.toISOString()}`, () => {
                const dateMarshaller = new DateMarshaller();

                expect(dateMarshaller.extract(date)).to.equal(date);
            });
        }

        for (const nonDate of NonDates) {
            it(`should throw for ${JSON.stringify(nonDate)}`, () => {
                const dateMarshaller = new DateMarshaller();

                expect(() => dateMarshaller.extract(nonDate)).to.throw('Expected a date');
            });
        }
    });

    describe('pack', () => {
        for (const date of Dates) {
            it(`should produce the same input for ${date.toISOString()}`, () => {
                const dateMarshaller = new DateMarshaller();

                expect(dateMarshaller.pack(date)).to.equal(date);
            });
        }
    });

    describe('extract and pack', () => {
        for (const date of Dates) {
            it(`should be opposites for ${date.toISOString()}`, () => {
                const dateMarshaller = new DateMarshaller();

                const raw = date;
                const extracted = dateMarshaller.extract(raw);
                const packed = dateMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});
