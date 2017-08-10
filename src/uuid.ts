import { ExtractError } from './core'
import { StringMarshaller } from './string'


export class UuidMarshaller extends StringMarshaller {
    private static readonly _uuidRegExp: RegExp = new RegExp('^[a-f0-9]{8}[-][a-f0-9]{4}[-][a-f0-9]{4}[-][a-f0-9]{4}[-][a-f0-9]{12}$');

    filter(a: string): string {
	      if (!UuidMarshaller._uuidRegExp.test(a)) {
	          throw new ExtractError('Expected a uuid');
	      }

	      return a;
    }
}
