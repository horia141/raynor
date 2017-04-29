import { expect } from 'chai'
import 'mocha'

import { NullMarshaller } from './null';


describe('NullMarshaller', () => {
    const NonNulls = [
	true,
        false,
	undefined,
	NaN,
	Number.POSITIVE_INFINITY,
	Number.NEGATIVE_INFINITY,
        100,
	'hello',
	'100',
	[],
	[true],
	{},
	{hello: false}
    ];

    describe('extract', () => {
        it('should parse null', () => {
            const nullMarshaller = new NullMarshaller();

            expect(nullMarshaller.extract(null)).to.be.null;
        });

        for (let nonNull of NonNulls) {
            it(`should throw for ${JSON.stringify(nonNull)}`, () => {
                const nullMarshaller = new NullMarshaller();

                expect(() => nullMarshaller.extract(nonNull)).to.throw('Expected a null');
            });
        }
    });

    describe('pack', () => {
        it('should pack null', () => {
            const nullMarshaller = new NullMarshaller();

            expect(nullMarshaller.pack(null)).to.be.null;
        });
    });

    describe('extract and pack', () => {
        it(`should be opposites for null`, () => {
            const nullMarshaller = new NullMarshaller();

            const raw = null;
            const extracted = nullMarshaller.extract(raw);
            const packed = nullMarshaller.pack(extracted);

            expect(packed).to.equal(raw);
        });
    });
});
