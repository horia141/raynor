import { ExtractError } from './core'
import { BaseNumberMarshaller } from './number'


export class EnumMarshaller<E> extends BaseNumberMarshaller<E> {
    // Can't get any better typing for now, I think.
    private readonly _constructor: any;

    constructor(constructor: any) {
	super();
	this._constructor = constructor;
    }
    
    build(a: number): E {
	if (!this._constructor.hasOwnProperty(a.toString())) {
	    throw new ExtractError('Unknown enum value');
	}

	return this._constructor[this._constructor[a]];
    }

    unbuild(b: E): number {
	return this._constructor[this._constructor[b]];
    }
}
