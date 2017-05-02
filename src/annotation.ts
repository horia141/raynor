import { ArrayMarshaller } from './array'
import { EnumMarshaller } from './enum'
import { MapMarshaller, MarshalMap } from './map'
import { Constructor, MarshallerConstructor, MarshalSchema, ObjectMarshaller, ObjectMarshallerConstructor } from './object'
import { OneOf2Marshaller, OneOf3Marshaller, OneOf4Marshaller } from './one-of'
import { OptionalMarshaller } from './optional'


export function OptionalOf<T>(marshallerCtor: MarshallerConstructor<T>): MarshallerConstructor<T|null> {
    return class extends OptionalMarshaller<T> {
	constructor() {
	    super(new marshallerCtor());
	}
    };
}


export function ArrayOf<T>(marshallerCtor: MarshallerConstructor<T>): MarshallerConstructor<T[]> {
    return class extends ArrayMarshaller<T> {
	constructor() {
	    super(new marshallerCtor());
	}
    };
}


export function MapOf<T>(marshallerCtor: MarshallerConstructor<T>): MarshallerConstructor<MarshalMap<T>> {
    return class extends MapMarshaller<T> {
	constructor() {
	    super(new marshallerCtor());
	}
    };
}


export function MarshalEnum<E>(constructor: any): MarshallerConstructor<E> {
    return class extends EnumMarshaller<E> {
        constructor() {
	    super(constructor);
	}
    }
}


export function OneOf2<E1 extends Object, E2 extends Object>(marshallerCtor1: ObjectMarshallerConstructor<E1>, marshallerCtor2: ObjectMarshallerConstructor<E2>): MarshallerConstructor<E1|E2> {
    return class extends OneOf2Marshaller<E1, E2> {
	constructor() {
	    super(new marshallerCtor1(), new marshallerCtor2());
	}
    }
}


export function OneOf3<E1 extends Object, E2 extends Object, E3 extends Object>(marshallerCtor1: ObjectMarshallerConstructor<E1>, marshallerCtor2: ObjectMarshallerConstructor<E2>, marshallerCtor3: ObjectMarshallerConstructor<E3>): MarshallerConstructor<E1|E2|E3> {
    return class extends OneOf3Marshaller<E1, E2, E3> {
	constructor() {
	    super(new marshallerCtor1(), new marshallerCtor2(), new marshallerCtor3());
	}
    }
}


export function OneOf4<E1 extends Object, E2 extends Object, E3 extends Object, E4 extends Object>(marshallerCtor1: ObjectMarshallerConstructor<E1>, marshallerCtor2: ObjectMarshallerConstructor<E2>, marshallerCtor3: ObjectMarshallerConstructor<E3>, marshallerCtor4: ObjectMarshallerConstructor<E4>): MarshallerConstructor<E1|E2|E3|E4> {
    return class extends OneOf4Marshaller<E1, E2, E3, E4> {
	constructor() {
	    super(new marshallerCtor1(), new marshallerCtor2(), new marshallerCtor3(), new marshallerCtor4());
	}
    }
}


export function MarshalWith<T>(marshallerCtor: MarshallerConstructor<T>) {
    return function(target: any, propertyKey: string) {
	if (!(target.hasOwnProperty('__schema'))) {
	    target.__schema = {};
	}
	
	target.__schema[propertyKey] = {marshaller: new marshallerCtor()};
    }
}


export function MarshalFrom<T>(constructor: Constructor<T>): ObjectMarshallerConstructor<T> {
    let schema = _extractSchema(constructor);

    if (schema === undefined) {
	schema = {} as MarshalSchema<T>;
    }
    
    return class extends ObjectMarshaller<T> {
	constructor() {
	    super(constructor, schema as MarshalSchema<T>);
	}
    };
}


const _maxInheritenceDepth = 32;
const _protoChain: any = new Array(_maxInheritenceDepth);


function _extractSchema<T>(constructor: Constructor<T>): MarshalSchema<T> {
    let proto = constructor.prototype;
    let protoChainSize = 0;

    while (proto != null) {
	if (protoChainSize >= _maxInheritenceDepth) {
	    throw new Error('Inheritence depth exceeded');
	}

	_protoChain[protoChainSize++] = proto;
	proto = Object.getPrototypeOf(proto);
    }

    let schema = {} as MarshalSchema<T>;

    for (let protoIdx = protoChainSize - 1; protoIdx >= 0; protoIdx--) {
	if (_protoChain[protoIdx].__schema === undefined) {
	    continue;
	}
	
	schema = (Object as any).assign(schema, _protoChain[protoIdx].__schema);
	_protoChain[protoIdx] = null;
    }

    return schema;
}
