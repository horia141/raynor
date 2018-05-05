import { expect } from 'chai'
import 'mocha'
import * as uuid from 'uuid'

import { UuidMarshaller } from './uuid'


describe('UuidMarshaller', () => {
    const Uuids = [
        '00000000-0000-0000-0000-000000000000',
        '01234567-89ab-cdef-0123-456789abcdef',
        'fedcba98-7654-3210-fedc-ba9876543210',
        uuid(),
        uuid(),
        uuid(),
        uuid()
    ];

    const NonUuids = [
        '',
        '---',
        '000000000-0000-0000-0000-000000000000',
        'Fedcba98-7654-3210-fedc-ba9876543210',
        'FEDCBA98-7654-3210-FEDC-BA9876543210',
        '$$!3131',
        '000000000000000000000000000000000'
    ];

    const NonStrings = [
        null,
        undefined,
        NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        100,
        -20,
        [],
        ['hello'],
        {},
        { hello: 'hello' }
    ];

    describe('extract', () => {
        for (const uuid of Uuids) {
            it(`should parse ${uuid}`, () => {
                const uuidMarshaller = new UuidMarshaller();

                expect(uuidMarshaller.extract(uuid)).to.equal(uuid);
            });
        }

        for (const nonUuid of NonUuids) {
            it(`should throw for invalid uuid ${nonUuid}`, () => {
                const uuidMarshaller = new UuidMarshaller();

                expect(() => uuidMarshaller.extract(nonUuid)).to.throw('Expected a uuid');
            });
        }

        for (const nonString of NonStrings) {
            it(`should throw for ${JSON.stringify(nonString)}`, () => {
                const uuidMarshaller = new UuidMarshaller();

                expect(() => uuidMarshaller.extract(nonString)).to.throw('Expected a string');
            });
        }
    });

    describe('pack', () => {
        for (const uuid of Uuids) {
            it(`should produce the same input for ${uuid}`, () => {
                const uuidMarshaller = new UuidMarshaller();

                expect(uuidMarshaller.pack(uuid)).to.equal(uuid);
            });
        }
    });

    describe('extract and pack', () => {
        for (const uuid of Uuids) {
            it(`should be opposites for ${uuid}`, () => {
                const uuidMarshaller = new UuidMarshaller();

                const raw = uuid;
                const extracted = uuidMarshaller.extract(raw);
                const packed = uuidMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});
