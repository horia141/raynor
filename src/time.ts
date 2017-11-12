import { ExtractError, Marshaller } from './core';
import { BaseNumberMarshaller } from './number';


export class DateFromTsMarshaller extends BaseNumberMarshaller<Date> {
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


export class DateMarshaller implements Marshaller<Date> {
    extract(raw: any): Date {
        if (!(raw instanceof Date)) {
            throw new ExtractError('Expected a date');
        }

        return raw;
    }

    pack(cooked: Date): any {
        return cooked;
    }
}
