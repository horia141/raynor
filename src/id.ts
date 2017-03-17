import { PositiveIntegerMarshaller } from './number'


export class IdMarshaller extends PositiveIntegerMarshaller {
    filter(id: number): number {
        // Need to have a simple filter because RaiseBuildFilterMarshaller doesn't allow gaps.
        return id;
    }
}