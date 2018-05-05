import { expect } from 'chai'
import 'mocha'

import { IntegerMarshaller } from './number'
import { SetMarshaller } from './set'


describe('SetMarshaller', () => {
    const integerMarshaller = new IntegerMarshaller();

    const Sets = [
        {
            raw: [],
            built: new Set<number>([])
        },
        {
            raw: [10, 20],
            built: new Set<number>([10, 20])
        }
    ];

    const DuplicateSets = [
        [1, 2, 3, 2],
        [1, 1]
    ];

    const BadSets = [
        [10.2, 20.3],
        ['hello', 'world']
    ];

    const NonSets = [
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

    describe('extract', () => {
        for (const { raw, built } of Sets) {
            it(`should extract ${JSON.stringify(raw)}`, () => {
                const setMarshaller = new SetMarshaller(integerMarshaller);
                expect(setMarshaller.extract(raw)).to.eql(built);
            })
        }

        for (const duplicateCase of DuplicateSets) {
            it(`should throw for ${JSON.stringify(duplicateCase)}`, () => {
                const setMarshaller = new SetMarshaller(integerMarshaller);

                expect(() => setMarshaller.extract(duplicateCase)).to.throw('Duplicate element encountered');
            });
        }

        for (const badCase of BadSets) {
            it(`should throw for ${JSON.stringify(badCase)}`, () => {
                const setMarshaller = new SetMarshaller(integerMarshaller);

                expect(() => setMarshaller.extract(badCase)).to.throw;
            });
        }

        for (const setMap of NonSets) {
            it(`should throw for ${JSON.stringify(setMap)}`, () => {
                const setMarshaller = new SetMarshaller(integerMarshaller);

                expect(() => setMarshaller.extract(setMap)).to.throw('Expected an array');
            });
        }
    });

    describe('pack', () => {
        for (const { raw, built } of Sets) {
            it(`should produce the same input for ${JSON.stringify(raw)}`, () => {
                const setMarshaller = new SetMarshaller(integerMarshaller);
                expect(setMarshaller.pack(built)).to.eql(raw);
            });
        }
    });

    describe('extract and pack', () => {
        for (const { raw } of Sets) {
            it(`should be opposites for ${JSON.stringify(raw)}`, () => {
                const setMarshaller = new SetMarshaller(integerMarshaller);

                const extracted = setMarshaller.extract(raw);
                const packed = setMarshaller.pack(extracted);

                expect(packed).to.eql(raw);
            });
        }
    });
});
