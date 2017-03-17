import { expect } from 'chai'
import 'mocha'

import { BooleanMarshaller } from './boolean';


describe('BooleanMarshaller', () => {
    const NonBooleans = [
	null,
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
        it('should parse true', () => {
            const booleanMarshaller = new BooleanMarshaller();

            expect(booleanMarshaller.extract(true)).to.be.true;
        });

        it('should parse false', () => {
            const booleanMarshaller = new BooleanMarshaller();

            expect(booleanMarshaller.extract(false)).to.be.false;
        });

        for (let nonBoolean of NonBooleans) {
            it(`should throw for ${JSON.stringify(nonBoolean)}`, () => {
                const booleanMarshaller = new BooleanMarshaller();

                expect(() => booleanMarshaller.extract(nonBoolean)).to.throw('Expected a boolean');
            });
        }
    });

    describe('pack', () => {
        it('should pack true', () => {
            const booleanMarshaller = new BooleanMarshaller();

            expect(booleanMarshaller.pack(true)).to.be.true;
        });

        it('should pack false', () => {
            const booleanMarshaller = new BooleanMarshaller();

            expect(booleanMarshaller.pack(false)).to.be.false;
        });
    });

    describe('extract and pack', () => {
        for (let bool of [true, false]) {
            it(`should be opposites for ${bool}`, () => {
                const booleanMarshaller = new BooleanMarshaller();

                const raw = bool;
                const extracted = booleanMarshaller.extract(raw);
                const packed = booleanMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});
