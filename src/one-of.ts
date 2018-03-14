import { ExtractError } from './core'
import { BaseObjectMarshaller, ObjectMarshaller, MarshalObject } from './object'


export class OneOf2Marshaller<E1 extends Object, E2 extends Object> extends BaseObjectMarshaller<E1 | E2> {
    private readonly _e1Marshaller: ObjectMarshaller<E1>;
    private readonly _e2Marshaller: ObjectMarshaller<E2>;

    constructor(e1Marshaller: ObjectMarshaller<E1>, e2Marshaller: ObjectMarshaller<E2>) {
        super();

        this._e1Marshaller = e1Marshaller;
        this._e2Marshaller = e2Marshaller;
    }

    build(raw: MarshalObject): E1 | E2 {
        if (raw.hasOwnProperty('e1')) {
            return this._e1Marshaller.extract(raw['e1']);
        } else if (raw.hasOwnProperty('e2')) {
            return this._e2Marshaller.extract(raw['e2']);
        } else {
            throw new ExtractError('Expected a one-of-2 object');
        }
    }

    unbuild(cooked: E1 | E2): MarshalObject {
        if (cooked instanceof this._e1Marshaller.getConstructor()) {
            return { e1: this._e1Marshaller.pack(cooked as E1) };
        } else {
            return { e2: this._e2Marshaller.pack(cooked as E2) };
        }
    }
}


export class OneOf3Marshaller<E1 extends Object, E2 extends Object, E3 extends Object> extends BaseObjectMarshaller<E1 | E2 | E3> {
    private readonly _e1Marshaller: ObjectMarshaller<E1>;
    private readonly _e2Marshaller: ObjectMarshaller<E2>;
    private readonly _e3Marshaller: ObjectMarshaller<E3>;

    constructor(e1Marshaller: ObjectMarshaller<E1>, e2Marshaller: ObjectMarshaller<E2>, e3Marshaller: ObjectMarshaller<E3>) {
        super();

        this._e1Marshaller = e1Marshaller;
        this._e2Marshaller = e2Marshaller;
        this._e3Marshaller = e3Marshaller;
    }

    build(raw: MarshalObject): E1 | E2 | E3 {
        if (raw.hasOwnProperty('e1')) {
            return this._e1Marshaller.extract(raw['e1']);
        } else if (raw.hasOwnProperty('e2')) {
            return this._e2Marshaller.extract(raw['e2']);
        } else if (raw.hasOwnProperty('e3')) {
            return this._e3Marshaller.extract(raw['e3']);
        } else {
            throw new ExtractError('Expected a one-of-3 object');
        }
    }

    unbuild(cooked: E1 | E2 | E3): MarshalObject {
        if (cooked instanceof this._e1Marshaller.getConstructor()) {
            return { e1: this._e1Marshaller.pack(cooked as E1) };
        } else if (cooked instanceof this._e2Marshaller.getConstructor()) {
            return { e2: this._e2Marshaller.pack(cooked as E2) };
        } else {
            return { e3: this._e3Marshaller.pack(cooked as E3) };
        }
    }
}


export class OneOf4Marshaller<E1 extends Object, E2 extends Object, E3 extends Object, E4 extends Object> extends BaseObjectMarshaller<E1 | E2 | E3 | E4> {
    private readonly _e1Marshaller: ObjectMarshaller<E1>;
    private readonly _e2Marshaller: ObjectMarshaller<E2>;
    private readonly _e3Marshaller: ObjectMarshaller<E3>;
    private readonly _e4Marshaller: ObjectMarshaller<E4>;

    constructor(e1Marshaller: ObjectMarshaller<E1>, e2Marshaller: ObjectMarshaller<E2>, e3Marshaller: ObjectMarshaller<E3>, e4Marshaller: ObjectMarshaller<E4>) {
        super();

        this._e1Marshaller = e1Marshaller;
        this._e2Marshaller = e2Marshaller;
        this._e3Marshaller = e3Marshaller;
        this._e4Marshaller = e4Marshaller;
    }

    build(raw: MarshalObject): E1 | E2 | E3 | E4 {
        if (raw.hasOwnProperty('e1')) {
            return this._e1Marshaller.extract(raw['e1']);
        } else if (raw.hasOwnProperty('e2')) {
            return this._e2Marshaller.extract(raw['e2']);
        } else if (raw.hasOwnProperty('e3')) {
            return this._e3Marshaller.extract(raw['e3']);
        } else if (raw.hasOwnProperty('e4')) {
            return this._e4Marshaller.extract(raw['e4']);
        } else {
            throw new ExtractError('Expected a one-of-4 object');
        }
    }

    unbuild(cooked: E1 | E2 | E3 | E4): MarshalObject {
        if (cooked instanceof this._e1Marshaller.getConstructor()) {
            return { e1: this._e1Marshaller.pack(cooked as E1) };
        } else if (cooked instanceof this._e2Marshaller.getConstructor()) {
            return { e2: this._e2Marshaller.pack(cooked as E2) };
        } else if (cooked instanceof this._e3Marshaller.getConstructor()) {
            return { e3: this._e3Marshaller.pack(cooked as E3) };
        } else {
            return { e4: this._e4Marshaller.pack(cooked as E4) };
        }
    }
}
