import { expect } from 'chai'
import 'mocha'

import { BooleanMarshaller } from './boolean'
import { OptionalMarshaller } from './optional'


describe('OptionalMarshaller', () => {
    describe('extract', () => {
        it('should parse true', () => {
            const booleanMarshaller = new BooleanMarshaller();
            const optionalMarshaller = new OptionalMarshaller(booleanMarshaller);

            expect(optionalMarshaller.extract(true)).to.be.true;
        });

        it('should parse null', () => {
            const booleanMarshaller = new BooleanMarshaller();
            const optionalMarshaller = new OptionalMarshaller(booleanMarshaller);

            expect(optionalMarshaller.extract(null)).to.be.null;
        });

        it('should parse undefined', () => {
            const booleanMarshaller = new BooleanMarshaller();
            const optionalMarshaller = new OptionalMarshaller(booleanMarshaller);

            expect(optionalMarshaller.extract(undefined)).to.be.null;
        });
    });

    describe('pack', () => {
        it('should pack true', () => {
            const booleanMarshaller = new BooleanMarshaller();
            const optionalMarshaller = new OptionalMarshaller(booleanMarshaller);

            expect(optionalMarshaller.pack(true)).to.be.true;
        });

        it('should pack null', () => {
            const booleanMarshaller = new BooleanMarshaller();
            const optionalMarshaller = new OptionalMarshaller(booleanMarshaller);

            expect(optionalMarshaller.pack(null)).to.be.null;
        });
    });
});
