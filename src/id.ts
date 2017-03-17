import { ExtractError } from './core'
import { IntegerMarshaller } from './number'


export class IdMarshaller extends IntegerMarshaller {
    filter(b: number): number {
        if (b <= 0) {
            throw new ExtractError('Expected a positive integer');
        }

        return b;
    }
}
