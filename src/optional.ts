import { Marshaller } from './core'


export class OptionalMarshaller<T> implements Marshaller<T|null> {
    private readonly _inner: Marshaller<T>;

    constructor(inner: Marshaller<T>) {
	this._inner = inner;
    }

    extract(raw: any): T|null {
	if (raw === null || raw === undefined) {
	    return null;
	}

	return this._inner.extract(raw);
    }

    pack(cooked: T|null): any {
        if (cooked === null) {
            return null;
        }
        
	return this._inner.pack(cooked);
    }
}
