import { ExtractError, RaiseBuildFilterMarshaller } from './core';


export abstract class BaseStringMarshaller<T> extends RaiseBuildFilterMarshaller<string, T> {
    raise(raw: any): string {
	if (typeof raw !== 'string') {
	    throw new ExtractError('Expected a string');
	}

	return raw;	
    }

    lower(a: string): any {
	return a;
    }
}


export class StringMarshaller extends BaseStringMarshaller<string> {
    build(a: string): string {
	return a;
    }

    unbuild(b: string): string {
	return b;
    }
}


export class MaxLengthStringMarshaller extends StringMarshaller {
    private readonly _maxLength: number;
    
    constructor(maxLength: number) {
	super();
	this._maxLength = maxLength;
    }
    
    filter(a: string): string {
	if (a.length > this._maxLength) {
	    throw new ExtractError(`Expected at most ${this._maxLength} characters`);
	}
	
	return a;
    }
}
