import { ExtractError, RaiseBuildFilterMarshaller } from './core'
import { BaseStringMarshaller } from './string'


export abstract class BaseNumberMarshaller<T> extends RaiseBuildFilterMarshaller<number, T> {
    raise(raw: any): number {
        if (typeof raw !== 'number') {
            throw new ExtractError('Expected a number');
        }

        if (Number.isNaN(raw) || raw == Number.POSITIVE_INFINITY || raw == Number.NEGATIVE_INFINITY) {
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
        if (!Number.isInteger(b)) {
            throw new ExtractError('Expected an integer');
        }

        return b;
    }
}


export class NonNegativeIntegerMarshaller extends IntegerMarshaller {
    filter(b: number): number {
        if (b < 0) {
            throw new ExtractError('Expected a non-negative integer');
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


export class NumberFromStringMarshaller extends BaseStringMarshaller<number> {
    build(a: string): number {
        let parsed = parseFloat(a);

        if (Number.isNaN(parsed)) {
            throw new ExtractError('Expected a number coded as a string');
        }

        return parsed;
    }

    unbuild(b: number): string {
        return b.toString();
    }
}


export class IntegerFromStringMarshaller extends NumberFromStringMarshaller {
    filter(b: number): number {
        if (!Number.isInteger(b)) {
            throw new ExtractError('Expected an integer');
        }

        return b;
    }
}


export class PositiveIntegerFromStringMarshaller extends IntegerFromStringMarshaller {
    filter(b: number): number {
        if (b <= 0) {
            throw new ExtractError('Expected a positive integer');
        }

        return b;
    }
}
