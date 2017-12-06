import { Marshaller, ExtractError } from './core'


export class MapMarshaller<K, V> implements Marshaller<Map<K, V>> {
    private readonly _keyMarshaller: Marshaller<K>;
    private readonly _valueMarshaller: Marshaller<V>;

    constructor(keyMarshaller: Marshaller<K>, valueMarshaller: Marshaller<V>) {
        this._keyMarshaller = keyMarshaller;
        this._valueMarshaller = valueMarshaller;
    }

    extract(raw: any): Map<K, V> {
        const result = new Map<K, V>();

        if (!Array.isArray(raw)) {
            throw new ExtractError('Expected an array');
        }

        for (let elem of raw) {
            if (!Array.isArray(elem)) {
                throw new ExtractError('Expected element to be an array');
            }

            if (elem.length != 2) {
                throw new ExtractError('Expected array element to be a pair');
            }

            result.set(this._keyMarshaller.extract(elem[0]), this._valueMarshaller.extract(elem[1]));
        }

        return result;
    }

    pack(map: Map<K, V>): any {
        const res = [];
        for (let [k, v] of map) {
            res.push([this._keyMarshaller.pack(k), this._valueMarshaller.pack(v)]);
        }
        return res;
    }
}
