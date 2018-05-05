import { Marshaller, ExtractError } from './core'


export class SetMarshaller<V> implements Marshaller<Set<V>> {
    private readonly _valueMarshaller: Marshaller<V>;

    constructor(valueMarshaller: Marshaller<V>) {
        this._valueMarshaller = valueMarshaller;
    }

    extract(raw: any): Set<V> {
        const result = new Set<V>([]);

        if (!Array.isArray(raw)) {
            throw new ExtractError('Expected an array');
        }

        for (const elem of raw) {
            if (result.has(elem)) {
                throw new ExtractError('Duplicate element encountered');
            }

            result.add(this._valueMarshaller.extract(elem));
        }

        return result;
    }

    pack(set: Set<V>): any {
        const res = [];
        for (const elem of set.values()) {
            res.push(this._valueMarshaller.pack(elem));
        }
        return res;
    }
}
