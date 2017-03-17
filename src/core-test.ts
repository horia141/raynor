import { expect } from 'chai'
import 'mocha'

import { NumberMarshaller } from './number'


describe('RaiseBuildFilterMarshaller', () => {
    class L01Marshaller extends NumberMarshaller { filter(b: number): number { return b; }}
    class L02Marshaller extends L01Marshaller { filter(b: number): number { return b; }}
    class L03Marshaller extends L02Marshaller { filter(b: number): number { return b; }}
    class L04Marshaller extends L03Marshaller { filter(b: number): number { return b; }}
    class L05Marshaller extends L04Marshaller { filter(b: number): number { return b; }}
    class L06Marshaller extends L05Marshaller { filter(b: number): number { return b; }}
    class L07Marshaller extends L06Marshaller { filter(b: number): number { return b; }}
    class L08Marshaller extends L07Marshaller { filter(b: number): number { return b; }}
    class L09Marshaller extends L08Marshaller { filter(b: number): number { return b; }}
    class L10Marshaller extends L09Marshaller { filter(b: number): number { return b; }}
    class L11Marshaller extends L10Marshaller { filter(b: number): number { return b; }}
    class L12Marshaller extends L11Marshaller { filter(b: number): number { return b; }}
    class L13Marshaller extends L12Marshaller { filter(b: number): number { return b; }}
    class L14Marshaller extends L13Marshaller { filter(b: number): number { return b; }}
    class L15Marshaller extends L14Marshaller { filter(b: number): number { return b; }}
    class L16Marshaller extends L15Marshaller { filter(b: number): number { return b; }}
    class L17Marshaller extends L16Marshaller { filter(b: number): number { return b; }}
    class L18Marshaller extends L17Marshaller { filter(b: number): number { return b; }}
    class L19Marshaller extends L18Marshaller { filter(b: number): number { return b; }}
    class L20Marshaller extends L19Marshaller { filter(b: number): number { return b; }}
    class L21Marshaller extends L20Marshaller { filter(b: number): number { return b; }}
    class L22Marshaller extends L21Marshaller { filter(b: number): number { return b; }}
    class L23Marshaller extends L22Marshaller { filter(b: number): number { return b; }}
    class L24Marshaller extends L23Marshaller { filter(b: number): number { return b; }}
    class L25Marshaller extends L24Marshaller { filter(b: number): number { return b; }}
    class L26Marshaller extends L25Marshaller { filter(b: number): number { return b; }}
    class L27Marshaller extends L26Marshaller { filter(b: number): number { return b; }}
    class L28Marshaller extends L27Marshaller { filter(b: number): number { return b; }}
    class L29Marshaller extends L28Marshaller { filter(b: number): number { return b; }}
    class L30Marshaller extends L29Marshaller { filter(b: number): number { return b; }}
    class L31Marshaller extends L30Marshaller { filter(b: number): number { return b; }}
    class L32Marshaller extends L31Marshaller { filter(b: number): number { return b; }}
    class L33Marshaller extends L32Marshaller { filter(b: number): number { return b; }}

    it('should not throw for a 32 depth hierarchy', () => {
        const l32Marshaller = new L32Marshaller();

        expect(l32Marshaller.extract(10)).to.eql(10);
    });

    it('should throw for a 33 depth hierarchy', () => {
        const l33Marshaller = new L33Marshaller();

        expect(() => l33Marshaller.extract(10)).to.throw('Inheritence depth exceeded for RaiseBuildFilterMarshaller');
    });
});
