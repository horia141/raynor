import { ExtractError } from './core';
import { BaseNumberMarshaller } from './number';


export class TimeMarshaller extends BaseNumberMarshaller<Date> {
    build(a: number): Date {
        // isInteger exists in modern browsers
	if (!(Number as any).isInteger(a)) {
	    throw new ExtractError('Expected an integer');
	}
	
	if (a < 0) {
	    throw new ExtractError('Expected a positive timestamp');
	}

	return new Date(a);
    }

    unbuild(date: Date): number {
	return date.getTime();
    }
}
