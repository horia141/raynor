import { ExtractError } from './core'
import { StringMarshaller } from './string'


export class AbsolutePathMarshaller extends StringMarshaller {
    private static readonly _pathRegExp: RegExp = new RegExp('^[/]([a-zA-Z0-9_]([a-zA-Z0-9_-]*[a-zA-Z0-9_])?[/]?)*$');

    filter(a: string): string {
        if (!AbsolutePathMarshaller._pathRegExp.test(a)) {
            throw new ExtractError('Expected an absolute path');
        }

        return a;
    }
}
