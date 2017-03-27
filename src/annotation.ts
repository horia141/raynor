import { ArrayMarshaller } from './array'
import { EnumMarshaller } from './enum'
import { MapMarshaller, MarshalMap } from './map'
import { Constructor, MarshallerConstructor, MarshalSchema, ObjectMarshaller } from './object'
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


export function MarshalWith<T>(marshallerCtor: MarshallerConstructor<T>) {
    return function(target: any, propertyKey: string) {
	if (!(target.hasOwnProperty('__schema'))) {
	    target.__schema = {};
	}
	
	target.__schema[propertyKey] = new marshallerCtor();
    }
}


export function MarshalFrom<T>(constructor: Constructor<T>): MarshallerConstructor<T> {
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
