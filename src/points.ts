import { ObjectMarshaller } from './object'
import { NumberMarshaller } from './number'
import { MarshalWith } from '.';


export class Point2 {
    @MarshalWith(NumberMarshaller)
    x: number;
    @MarshalWith(NumberMarshaller)
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

export const APoint2Marshaller = new ObjectMarshaller<Point2>(Point2, {
    x: { marshaller: new NumberMarshaller() },
    y: { marshaller: new NumberMarshaller() }
});

export class Point3 {
    @MarshalWith(NumberMarshaller)
    x: number;
    @MarshalWith(NumberMarshaller)
    y: number;
    @MarshalWith(NumberMarshaller)
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

export const APoint3Marshaller = new ObjectMarshaller<Point3>(Point3, {
    x: { marshaller: new NumberMarshaller() },
    y: { marshaller: new NumberMarshaller() },
    z: { marshaller: new NumberMarshaller() }
});

export class Point4 {
    @MarshalWith(NumberMarshaller)
    x: number;
    @MarshalWith(NumberMarshaller)
    y: number;
    @MarshalWith(NumberMarshaller)
    z: number;
    @MarshalWith(NumberMarshaller)
    w: number;

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
}

export const APoint4Marshaller = new ObjectMarshaller<Point4>(Point4, {
    x: { marshaller: new NumberMarshaller() },
    y: { marshaller: new NumberMarshaller() },
    z: { marshaller: new NumberMarshaller() },
    w: { marshaller: new NumberMarshaller() }
});

export class Point5 {
    @MarshalWith(NumberMarshaller)
    x: number;
    @MarshalWith(NumberMarshaller)
    y: number;
    @MarshalWith(NumberMarshaller)
    z: number;
    @MarshalWith(NumberMarshaller)
    w: number;
    @MarshalWith(NumberMarshaller)
    m: number;

    constructor(x: number, y: number, z: number, w: number, m: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.m = m;
    }
}

export const Point5Marshaller = new ObjectMarshaller<Point5>(Point5, {
    x: { marshaller: new NumberMarshaller() },
    y: { marshaller: new NumberMarshaller() },
    z: { marshaller: new NumberMarshaller() },
    w: { marshaller: new NumberMarshaller() },
    m: { marshaller: new NumberMarshaller() }
});
