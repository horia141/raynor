import { ExtractError, Marshaller, RaiseBuildFilterMarshaller } from './core'
import { OptionalMarshaller } from './optional'


export type MarshalObject = {
    [key: string]: any
}


export abstract class BaseObjectMarshaller<T extends Object> extends RaiseBuildFilterMarshaller<MarshalObject, T> {
    raise(raw: any): MarshalObject {
        if (!(raw != null && typeof raw === 'object' && !Array.isArray(raw))) {
            throw new ExtractError('Expected an object');
        }

	return raw;
    }

    lower(a: MarshalObject): any {
	return a;
    }
}


export class UntypedObjectMarshaller extends BaseObjectMarshaller<Object> {
    build(raw: MarshalObject): Object {
	return raw;
    }

    unbuild(cooked: Object): MarshalObject {
	return cooked;
    }
}


export type MarshalSchema<T extends Object> = {
    readonly [key in keyof T]?: Marshaller<T[key]>
}


export type Constructor<T> = new(...args: any[]) => T;
export type MarshallerConstructor<T> = new () => Marshaller<T>;


export class ObjectMarshaller<T extends Object> extends BaseObjectMarshaller<T> {
    private readonly _constructor: Constructor<T>;
    private readonly _schema: MarshalSchema<T>;

    constructor(constructor: Constructor<T>, schema: MarshalSchema<T>) {
	for (let propName in schema) {
	    if (typeof schema[propName] == 'undefined') {
		throw new ExtractError(`Cannot accept undefined as a marshaller for ${propName}`);
	    }
	}

	super();
	this._constructor = constructor;
        this._schema = schema;
    }

    build(raw: MarshalObject): T {
        // We're gonna build it to it's final form in a typesafe way here.
        const cooked = new this._constructor();

        for (let propName in this._schema) {
	    const marshaller = this._schema[propName];

	    if (typeof marshaller == 'undefined') {
		throw new Error('Should never happen');
	    }
	    
	    if (marshaller instanceof OptionalMarshaller && !raw.hasOwnProperty(propName)) {
		continue;
	    }
	    
            if (!raw.hasOwnProperty(propName)) {
                throw new ExtractError(`Field ${propName} is missing`);
            }

	    cooked[propName] = marshaller.extract(raw[propName]);
        }

        return cooked as T;
    }

    unbuild(cooked: T): MarshalObject {
	const b: MarshalObject = {};

	for (let propName in this._schema) {
	    const marshaller = this._schema[propName];

	    if (typeof marshaller == 'undefined') {
		throw new ExtractError('Should never happen');
	    }

	    b[propName] = marshaller.pack(cooked[propName]);
	}

	return b;
    }
}
