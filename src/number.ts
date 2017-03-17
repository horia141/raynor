import { ExtractError, RaiseBuildFilterMarshaller } from './core';


export abstract class BaseNumberMarshaller<T> extends RaiseBuildFilterMarshaller<number, T> {
    raise(raw: any): number {
	if (typeof raw !== 'number') {
	    throw new ExtractError('Expected a number');
	}

        // isNaN exists in modern browsers.
	if ((Number as any).isNaN(raw) || raw == Number.POSITIVE_INFINITY || raw == Number.NEGATIVE_INFINITY) {
	    throw new ExtractError('Expected a number');
	}

	return raw;
    }

    lower(a: number): any {
	return a;
    }
}


export class NumberMarshaller extends BaseNumberMarshaller<number> {
    build(a: number): number {
	return a;
    }

    unbuild(b: number): number {
	return b;
    }
}


export class IntegerMarshaller extends NumberMarshaller {
    filter(b: number): number {
        // isNumber exists in modern browser.
        if (!(Number as any).isInteger(b)) {
            throw new ExtractError('Expected an integer');
        }

        return b;
    }
}


export class PositiveIntegerMarshaller extends IntegerMarshaller {
    filter(b: number): number {
	if (b <= 0) {
	    throw new ExtractError('Expected a positive integer');
	}

        return b;
    }
}
