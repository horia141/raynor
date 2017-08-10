import { ExtractError, Marshaller } from './core'


export class TryInOrderMarshaller<T> implements Marshaller<T> {
    private readonly _inners: Marshaller<T>[];

    constructor(inner: Marshaller<T>, ...args: Marshaller<T>[]) {
	      this._inners = [inner].concat(args);
    }

    extract(raw: any): T {
	      for (let inner of this._inners) {
	          try {
		            return inner.extract(raw);
	          } catch (e) {
		            // Ignore error
	          }
	      }

	      throw new ExtractError('Expected at least one marshaller to work');
    }

    pack(cooked: T): any {
	      return this._inners[0].pack(cooked);
    }
}
