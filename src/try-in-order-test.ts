import { expect } from 'chai'
import 'mocha'

import { NumberMarshaller, NumberFromStringMarshaller } from './number'
import { TryInOrderMarshaller } from './try-in-order'


describe('TryInOrderMarshaller', () => {
    const Numbers = [
        [1, 1],
        [10, 10],
        [-54, -54],
        [4.3, 4.3],
        [893.2, 893.2],
        ['1', 1],
        ['10', 10],
        ['-54', -54],
        ['4.3', 4.3],
        ['893.2', 893.2]
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
        '',
        '-',
        [],
        [100],
        {},
        {hello: 20.2}
    ];

    describe('extract', () => {
        for (const [numberRaw, numberParsed] of Numbers) {
            it(`should parse ${JSON.stringify(numberRaw)}`, () => {
                const numberMarshaller = new TryInOrderMarshaller(new NumberMarshaller(), new NumberFromStringMarshaller());

                expect(numberMarshaller.extract(numberRaw)).to.be.within((numberParsed as number) - 1e-6, (numberParsed as number) + 1e-6);
            });
        }

        for (const nonNumber of NonNumbers) {
            it(`should throw for ${JSON.stringify(nonNumber)}`, () => {
                const numberMarshaller = new TryInOrderMarshaller(new NumberMarshaller(), new NumberFromStringMarshaller());

                expect(() => numberMarshaller.extract(nonNumber)).to.throw('Expected at least one marshaller to work');
            });
        }
    });

    describe('pack', () => {
        for (const [numberRaw, numberParsed] of Numbers) {
            it(`should produce a number when first marshaller is the NumberMarshaller for ${JSON.stringify(numberRaw)}`, () => {
                const numberMarshaller = new TryInOrderMarshaller(new NumberMarshaller(), new NumberFromStringMarshaller());

                expect(numberMarshaller.pack(numberParsed as number)).to.equal(numberParsed as number);
            });
        }

        for (const [numberRaw, numberParsed] of Numbers) {
            it(`should produce a string when first marshaller is the NumberFromStringMarshaller for ${JSON.stringify(numberRaw)}`, () => {
                const numberMarshaller = new TryInOrderMarshaller(new NumberFromStringMarshaller(), new NumberMarshaller());

                expect(numberMarshaller.pack(numberParsed as number)).to.equal(numberRaw.toString());
            });
        }
    });

    describe('extract and pack', () => {
        for (const [numberRaw, numberParsed] of Numbers) {
            it(`should produce a number when first marshaller is the NumberMarshaller for ${JSON.stringify(numberRaw)}`, () => {
                const numberMarshaller = new TryInOrderMarshaller(new NumberMarshaller(), new NumberFromStringMarshaller());

                const raw = numberRaw;
                const extracted = numberMarshaller.extract(raw);
                const packed = numberMarshaller.pack(extracted);

                expect(packed).to.equal(numberParsed);
            });
        }

        for (const [numberRaw, numberParsed] of Numbers) {
            it(`should produce a string when first marshaller is the NumberFromStringMarshaller for ${JSON.stringify(numberRaw)}`, () => {
                const numberMarshaller = new TryInOrderMarshaller(new NumberFromStringMarshaller(), new NumberMarshaller());

                const raw = numberRaw;
                const extracted = numberMarshaller.extract(raw);
                const packed = numberMarshaller.pack(extracted);

                expect(packed).to.equal(numberParsed.toString());
            });
        }
    });
});
