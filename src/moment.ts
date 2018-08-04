import * as moment from "moment";

import { ExtractError } from './core';
import { BaseNumberMarshaller } from './number';


export class MomentFromTsMarshaller extends BaseNumberMarshaller<moment.Moment> {
    build(a: number): moment.Moment {
        // isInteger exists in modern browsers
        if (!Number.isInteger(a)) {
            throw new ExtractError('Expected an integer');
        }

        if (a < 0) {
            throw new ExtractError('Expected a positive timestamp');
        }

        return moment(a).utc();
    }

    unbuild(mom: moment.Moment): number {
        return mom.valueOf();
    }
}
