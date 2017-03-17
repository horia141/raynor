import { expect } from 'chai'
import 'mocha'

import { EnumMarshaller } from './enum'


describe('EnumMarshaller', () => {
    enum Role {
        Unknown = 0,
	Regular = 1,
	Admin = 2
    }

    const Roles = [
	[0, Role.Unknown],
	[1, Role.Regular],
	[2, Role.Admin]
    ];

    const NonRoles = [
        -1,
	2.3,
	3,
	40
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
	'100',
	[],
	[100],
	{},
	{hello: 20.2}
    ];

    describe('extract', () => {
	for (let [roleId, role] of Roles) {
	    it(`should parse Role.${Role[roleId]}`, () => {
		const roleMarshaller = new EnumMarshaller<Role>(Role);

		expect(roleMarshaller.extract(roleId)).to.equal(role);
	    });
	}

	for (let roleId of NonRoles) {
	    it(`should throw for non-role ${roleId}`, () => {
		const roleMarshaller = new EnumMarshaller<Role>(Role);

		expect(() => roleMarshaller.extract(roleId)).to.throw('Unknown enum value');
	    });
	}

	for (let nonNumber of NonNumbers) {
            it(`should throw for ${JSON.stringify(nonNumber)}`, () => {
                const roleMarshaller = new EnumMarshaller<Role>(Role);

                expect(() => roleMarshaller.extract(nonNumber)).to.throw('Expected a number');
            });
        }
    });

    describe('pack', () => {
	for (let [roleId, role] of Roles) {
	    it(`should produce the same input for ${Role[roleId]}`, () => {
		const roleMarshaller = new EnumMarshaller<Role>(Role);

		expect(roleMarshaller.pack(role)).to.equal(roleId);
	    });
	}
    });

    describe('extract and pack', () => {
        for (let [roleId, _] of Roles) {
            it(`should be opposites for ${roleId}`, () => {
                const roleMarshaller = new EnumMarshaller<Role>(Role);

                const raw = roleId;
		const extracted = roleMarshaller.extract(raw);
		const packed = roleMarshaller.pack(extracted);

		expect(packed).to.equal(raw);
            });
        }	
    });
});
