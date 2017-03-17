export class MarshallError extends Error {
    constructor(message: string) {
	super(message);
	this.name = 'MarshallError';
    }
}


export class ExtractError extends MarshallError {
    constructor(message: string) {
	super(message);
	this.name = 'ExtractError';
    }
}


export interface Marshaller<T> {
    extract(raw: any): T;
    pack(cooked: T): any;
}


export abstract class RaiseBuildFilterMarshaller<A, B> implements Marshaller<B> {
    private static _MaxInheritanceDepth = 32;
    private static _ProtoChain: any = new Array(RaiseBuildFilterMarshaller._MaxInheritanceDepth);

    extract(raw: any): B {
	const a:A = this.raise(raw);
	let b:B = this.build(a);

	let proto = Object.getPrototypeOf(this);
        let protoChainSize = 0;

        while (proto != null && proto.hasOwnProperty('filter')) {
            if (protoChainSize >= RaiseBuildFilterMarshaller._MaxInheritanceDepth) {
                throw new Error('Inheritence depth exceeded for RaiseBuildFilterMarshaller');
            }

            RaiseBuildFilterMarshaller._ProtoChain[protoChainSize++] = proto;
            proto = Object.getPrototypeOf(proto);
        }

        for (let protoIdx = protoChainSize - 1; protoIdx >= 0; protoIdx--) {
            b = RaiseBuildFilterMarshaller._ProtoChain[protoIdx].filter(b);
            RaiseBuildFilterMarshaller._ProtoChain[protoIdx] = null;
        }

	return b;
    }

    pack(b: B): any {
	const a:A = this.unbuild(b);
	const raw:any = this.lower(a);

	return raw;
    }

    abstract raise(raw: any): A;
    abstract lower(a: A): any;
    abstract build(a: A): B;
    abstract unbuild(b: B): A;
}
