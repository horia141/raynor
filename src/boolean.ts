import { ExtractError, Marshaller } from './core';

export class BooleanMarshaller implements Marshaller<boolean> {
    extract(raw: any): boolean {
	if (typeof raw !== 'boolean') {
	    throw new ExtractError('Expected a boolean');
	}

	return raw;
    }

    pack(cooked: boolean): any {
	return cooked;
    }
}
