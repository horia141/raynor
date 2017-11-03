import { ExtractError } from './core'
import { BaseNumberMarshaller } from './number'


export class EnumMarshaller<E> extends BaseNumberMarshaller<E> {
    // Can't get any better typing for now, I think.
    private readonly _constructor: any;
    private readonly _default: E | null;

    constructor(constructor: any, default_?: E) {
        super();
        this._constructor = constructor;
        if (typeof default_ == 'undefined')
            this._default = null;
        else
            this._default = default_;
    }

    build(a: number): E {
        if (!this._constructor.hasOwnProperty(a.toString())) {
            throw new ExtractError('Unknown enum value');
        }

        const value = this._constructor[this._constructor[a]];

        if (this._default != null && value == this._default) {
            throw new ExtractError('Default value not allowed');
        }

        return value;
    }

    unbuild(b: E): number {
        return this._constructor[this._constructor[b]];
    }
}
