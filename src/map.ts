import { Marshaller } from './core'
import { BaseObjectMarshaller, MarshalObject } from './object'


export type UntypedMarshalMap = {
    [key: string]: any
}


export class UntypedMapMarshaller extends BaseObjectMarshaller<UntypedMarshalMap> {
    build(a: MarshalObject): UntypedMarshalMap {
	return a;
    }

    unbuild(cooked: UntypedMarshalMap): MarshalObject {
	return cooked;
    }
}


export type MarshalMap<K> = {
    [key: string]: K
}


export class MapMarshaller<K> extends BaseObjectMarshaller<MarshalMap<K>> {
    private readonly _inner: Marshaller<K>;

    constructor(inner: Marshaller<K>) {
	super();
	this._inner = inner;
    }


    build(a: MarshalObject): MarshalMap<K> {
	const cooked: MarshalMap<K> = {};

	for (let key in a) {
	    cooked[key] = this._inner.extract(a[key]);
	}

	return cooked;
    }

    unbuild(cooked: MarshalMap<K>): MarshalObject {
	const a: MarshalObject = {};

	for (let key in cooked) {
	    a[key] = this._inner.pack(cooked[key]);
	}

	return a;
    }
}
