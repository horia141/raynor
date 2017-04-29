import { ExtractError, Marshaller } from './core';

export class NullMarshaller implements Marshaller<null> {
    extract(raw: any): null {
	if (raw != null) {
	    throw new ExtractError('Expected a null');
	}

        if (typeof raw != 'object') {
	    throw new ExtractError('Expected a null');
	}

	return null;
    }

    pack(cooked: null): any {
	return cooked;
    }
}
