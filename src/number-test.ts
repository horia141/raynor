import { expect } from 'chai'
import 'mocha'

import { IntegerFromStringMarshaller,
         IntegerMarshaller,
         NonNegativeIntegerMarshaller,
         NumberFromStringMarshaller,
         NumberMarshaller,
         PositiveIntegerFromStringMarshaller,
         PositiveIntegerMarshaller } from './number'


describe('NumberMarshaller', () => {
    const Numbers = [
        1,
        10,
        -54,
        4.3,
        893.2
    ];

    const NonNumbers = [
        null,
        undefined,
        NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        true,
        false,
        'hello',
        '100',
        [],
        [100],
        {},
        {hello: 20.2}
    ];

    describe('extract', () => {
        for (const number of Numbers) {
            it(`should parse ${number}`, () => {
                const numberMarshaller = new NumberMarshaller();

                expect(numberMarshaller.extract(number)).to.equal(number);
            });
        }

        for (const nonNumber of NonNumbers) {
            it(`should throw for ${JSON.stringify(nonNumber)}`, () => {
                const numberMarshaller = new NumberMarshaller();

                expect(() => numberMarshaller.extract(nonNumber)).to.throw('Expected a number');
            });
        }
    });

    describe('pack', () => {
        for (const number of Numbers) {
            it(`should produce the same input for ${number}`, () => {
                const numberMarshaller = new NumberMarshaller();

                expect(numberMarshaller.pack(number)).to.equal(number);
            });
        }
    });

    describe('extract and pack', () => {
        for (const number of Numbers) {
            it(`should be opposites for ${number}`, () => {
                const numberMarshaller = new NumberMarshaller();

                const raw = number;
                const extracted = numberMarshaller.extract(raw);
                const packed = numberMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});


describe('IntegerMarshaller', () => {
    const Integers = [
        1,
        3
            -5,
        20
    ];

    const NonIntegers = [
        1.2,
            -3.14,
        1.3941e+3
    ];

    const NonNumerics = [
        null,
        undefined,
        NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        'hello',
        '100',
        [],
        [100],
        {},
        {hello: 100}
    ];

    describe('extract', () => {
        for (const integer of Integers) {
            it(`should parse ${integer}`, () => {
                const integerMarshaller = new IntegerMarshaller();

                expect(integerMarshaller.extract(integer)).to.equal(integer);
            });
        }

        for (const nonInteger of NonIntegers) {
            it(`should throw for float ${nonInteger}`, () => {
                const integerMarshaller = new IntegerMarshaller();

                expect(() => integerMarshaller.extract(nonInteger)).to.throw('Expected an integer');
            });
        }

        for (const nonNumeric of NonNumerics) {
            it(`should throw for ${nonNumeric}`, () => {
                const integerMarshaller = new IntegerMarshaller();

                expect(() => integerMarshaller.extract(nonNumeric)).to.throw('Expected a number');
            });
        }
    });

    describe('pack', () => {
        for (const integer of Integers) {
            it(`should produce the same input for ${integer}`, () => {
                const integerMarshaller = new IntegerMarshaller();

                expect(integerMarshaller.pack(integer)).to.equal(integer);
            });
        }
    });

    describe('extract and pack', () => {
        for (const integer of Integers) {
            it(`should be opposites for ${integer}`, () => {
                const integerMarshaller = new IntegerMarshaller();

                const raw = integer;
                const extracted = integerMarshaller.extract(raw);
                const packed = integerMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});

describe('NonNegativeIntegerMarshaller', () => {
    const NonNegativeIntegers = [
        0,
        1,
        103,
        23213131
    ];

    const NegativeIntegers = [
            -1,
            -312
    ];

    const NonIntegers = [
        1.41,
            -3.12
    ];

    const NonNumerics = [
        null,
        undefined,
        NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        'hello',
        '100',
        [],
        [100],
        {},
        {hello: 100}
    ];

    describe('extract', () => {
        for (const id of NonNegativeIntegers) {
            it(`should parse ${id} `, () => {
                const idMarshaller = new NonNegativeIntegerMarshaller();

                expect(idMarshaller.extract(id)).to.equal(id);
            });
        }

        for (const negativeInteger of NegativeIntegers) {
            it(`should throw for negative id ${negativeInteger}`, () => {
                const idMarshaller = new NonNegativeIntegerMarshaller();

                expect(() => idMarshaller.extract(negativeInteger)).to.throw('Expected a non-negative integer');
            });
        }

        for (const nonInteger of NonIntegers) {
            it(`should throw for float id ${nonInteger}`, () => {
                const idMarshaller = new NonNegativeIntegerMarshaller();

                expect(() => idMarshaller.extract(nonInteger)).to.throw('Expected an integer');
            });
        }

        for (const nonNumeric of NonNumerics) {
            it(`should throw for ${JSON.stringify(nonNumeric)}`, () => {
                const idMarshaller = new NonNegativeIntegerMarshaller();

                expect(() => idMarshaller.extract(nonNumeric)).to.throw('Expected a number');
            });
        }
    });

    describe('pack', () => {
        for (const id of NonNegativeIntegers) {
            it(`should produce the same input for ${id}`, () => {
                const idMarshaller = new NonNegativeIntegerMarshaller();

                expect(idMarshaller.pack(id)).to.equal(id);
            });
        }
    });

    describe('extract and pack', () => {
        for (const id of NonNegativeIntegers) {
            it(`should be opposites for ${id}`, () => {
                const idMarshaller = new NonNegativeIntegerMarshaller();

                const raw = id;
                const extracted = idMarshaller.extract(raw);
                const packed = idMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});


describe('PositiveIntegerMarshaller', () => {
    const PositiveIntegers = [
        1,
        103,
        23213131
    ];

    const NonPositiveIntegers = [
        0,
            -1,
            -312
    ];

    const NonIntegers = [
        1.41,
            -3.12
    ];

    const NonNumerics = [
        null,
        undefined,
        NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        'hello',
        '100',
        [],
        [100],
        {},
        {hello: 100}
    ];

    describe('extract', () => {
        for (const id of PositiveIntegers) {
            it(`should parse ${id} `, () => {
                const idMarshaller = new PositiveIntegerMarshaller();

                expect(idMarshaller.extract(id)).to.equal(id);
            });
        }

        for (const nonPositiveInteger of NonPositiveIntegers) {
            it(`should throw for negative id ${nonPositiveInteger}`, () => {
                const idMarshaller = new PositiveIntegerMarshaller();

                expect(() => idMarshaller.extract(nonPositiveInteger)).to.throw('Expected a positive integer');
            });
        }

        for (const nonInteger of NonIntegers) {
            it(`should throw for float id ${nonInteger}`, () => {
                const idMarshaller = new PositiveIntegerMarshaller();

                expect(() => idMarshaller.extract(nonInteger)).to.throw('Expected an integer');
            });
        }

        for (const nonNumeric of NonNumerics) {
            it(`should throw for ${JSON.stringify(nonNumeric)}`, () => {
                const idMarshaller = new PositiveIntegerMarshaller();

                expect(() => idMarshaller.extract(nonNumeric)).to.throw('Expected a number');
            });
        }
    });

    describe('pack', () => {
        for (const id of PositiveIntegers) {
            it(`should produce the same input for ${id}`, () => {
                const idMarshaller = new PositiveIntegerMarshaller();

                expect(idMarshaller.pack(id)).to.equal(id);
            });
        }
    });

    describe('extract and pack', () => {
        for (const id of PositiveIntegers) {
            it(`should be opposites for ${id}`, () => {
                const idMarshaller = new PositiveIntegerMarshaller();

                const raw = id;
                const extracted = idMarshaller.extract(raw);
                const packed = idMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});


describe('NumberFromStringMarshaller', () => {
    const Numbers = [
        ['1', 1],
        ['10', 10],
        ['-54', -54],
        ['4.3', 4.3],
        ['893.2', 893.2]
    ];

    const NonNumbers = [
        '',
        'hello',
        '-'
    ];

    const NonStrings = [
        null,
        undefined,
        NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        true,
        false,
        100,
        3232.3,
        [],
        [100],
        {},
        {hello: 20.2}
    ];

    describe('extract', () => {
        for (const [numberString, numberParsed] of Numbers) {
            it(`should parse ${numberString}`, () => {
                const numberMarshaller = new NumberFromStringMarshaller();

                expect(numberMarshaller.extract(numberString)).to.be.within((numberParsed as number) - 1e-6, (numberParsed as number) + 1e-6);
            });
        }

        for (const nonNumber of NonNumbers) {
            it(`should throw for ${JSON.stringify(nonNumber)}`, () => {
                const numberMarshaller = new NumberFromStringMarshaller();

                expect(() => numberMarshaller.extract(nonNumber)).to.throw('Expected a number coded as a string');
            });
        }

        for (const nonString of NonStrings) {
            it(`should throw for ${JSON.stringify(nonString)}`, () => {
                const numberMarshaller = new NumberFromStringMarshaller();

                expect(() => numberMarshaller.extract(nonString)).to.throw('Expected a string');
            });
        }
    });

    describe('pack', () => {
        for (const [numberString, numberParsed] of Numbers) {
            it(`should produce the same input for ${numberString}`, () => {
                const numberMarshaller = new NumberFromStringMarshaller();

                expect(numberMarshaller.pack(numberParsed as number)).to.equal(numberString as string);
            });
        }
    });

    describe('extract and pack', () => {
        for (const [numberString, _] of Numbers) {
            it(`should be opposites for ${numberString}`, () => {
                const numberMarshaller = new NumberFromStringMarshaller();

                const raw = numberString;
                const extracted = numberMarshaller.extract(raw);
                const packed = numberMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});


describe('IntegerFromStringMarshaller', () => {
    const Integers = [
        ['1', 1],
        ['3', 3],
        ['-5', -5],
        ['20', 20]
    ];

    const NonIntegers = [
        '1.2',
        '-3.14',
        '1.3941e+3'
    ];

    const NonNumbers = [
        '',
        'hello',
        '-'
    ];

    const NonStrings = [
        null,
        undefined,
        NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        100,
        3232.3,
        [],
        [100],
        {},
        {hello: 100}
    ];

    describe('extract', () => {
        for (const [integerString, integerParsed] of Integers) {
            it(`should parse ${integerString}`, () => {
                const integerMarshaller = new IntegerFromStringMarshaller();

                expect(integerMarshaller.extract(integerString)).to.equal(integerParsed);
            });
        }

        for (const nonInteger of NonIntegers) {
            it(`should throw for float ${JSON.stringify(nonInteger)}`, () => {
                const integerMarshaller = new IntegerFromStringMarshaller();

                expect(() => integerMarshaller.extract(nonInteger)).to.throw('Expected an integer');
            });
        }

        for (const nonNumber of NonNumbers) {
            it(`should throw for ${JSON.stringify(nonNumber)}`, () => {
                const numberMarshaller = new IntegerFromStringMarshaller();

                expect(() => numberMarshaller.extract(nonNumber)).to.throw('Expected a number coded as a string');
            });
        }

        for (const nonString of NonStrings) {
            it(`should throw for ${JSON.stringify(nonString)}`, () => {
                const integerMarshaller = new IntegerFromStringMarshaller();

                expect(() => integerMarshaller.extract(nonString)).to.throw('Expected a string');
            });
        }
    });

    describe('pack', () => {
        for (const [integerString, integerParsed] of Integers) {
            it(`should produce the same input for ${integerString}`, () => {
                const integerMarshaller = new IntegerFromStringMarshaller();

                expect(integerMarshaller.pack(integerParsed as number)).to.equal(integerString as string);
            });
        }
    });

    describe('extract and pack', () => {
        for (const [integerString, _] of Integers) {
            it(`should be opposites for ${integerString}`, () => {
                const integerMarshaller = new IntegerFromStringMarshaller();

                const raw = integerString;
                const extracted = integerMarshaller.extract(raw);
                const packed = integerMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});


describe('PositiveIntegerFromStringMarshaller', () => {
    const PositiveIntegers = [
        ['1', 1],
        ['103', 103],
        ['23213131', 23213131]
    ];

    const NonPositiveIntegers = [
        '0',
        '-1',
        '-312'
    ];

    const NonIntegers = [
        '1.41',
        '-3.12'
    ];

    const NonNumbers = [
        '',
        'hello',
        '-'
    ];

    const NonStrings = [
        null,
        undefined,
        NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        100,
        3232.3,
        [],
        [100],
        {},
        {hello: 100}
    ];

    describe('extract', () => {
        for (const [positiveIntegerString, positiveIntegerParsed] of PositiveIntegers) {
            it(`should parse ${positiveIntegerString} `, () => {
                const idMarshaller = new PositiveIntegerFromStringMarshaller();

                expect(idMarshaller.extract(positiveIntegerString)).to.equal(positiveIntegerParsed);
            });
        }

        for (const nonPositiveInteger of NonPositiveIntegers) {
            it(`should throw for negative ${nonPositiveInteger}`, () => {
                const idMarshaller = new PositiveIntegerFromStringMarshaller();

                expect(() => idMarshaller.extract(nonPositiveInteger)).to.throw('Expected a positive integer');
            });
        }

        for (const nonInteger of NonIntegers) {
            it(`should throw for float ${nonInteger}`, () => {
                const idMarshaller = new PositiveIntegerFromStringMarshaller();

                expect(() => idMarshaller.extract(nonInteger)).to.throw('Expected an integer');
            });
        }

        for (const nonNumber of NonNumbers) {
            it(`should throw for ${JSON.stringify(nonNumber)}`, () => {
                const numberMarshaller = new PositiveIntegerFromStringMarshaller();

                expect(() => numberMarshaller.extract(nonNumber)).to.throw('Expected a number coded as a string');
            });
        }

        for (const nonString of NonStrings) {
            it(`should throw for ${JSON.stringify(nonString)}`, () => {
                const idMarshaller = new PositiveIntegerFromStringMarshaller();

                expect(() => idMarshaller.extract(nonString)).to.throw('Expected a string');
            });
        }
    });

    describe('pack', () => {
        for (const [positiveIntegerString, positiveIntegerParsed] of PositiveIntegers) {
            it(`should produce the same input for ${positiveIntegerString}`, () => {
                const idMarshaller = new PositiveIntegerFromStringMarshaller();

                expect(idMarshaller.pack(positiveIntegerParsed as number)).to.equal(positiveIntegerString as string);
            });
        }
    });

    describe('extract and pack', () => {
        for (const [positiveIntegerString, _] of PositiveIntegers) {
            it(`should be opposites for ${positiveIntegerString}`, () => {
                const idMarshaller = new PositiveIntegerFromStringMarshaller();

                const raw = positiveIntegerString;
                const extracted = idMarshaller.extract(raw);
                const packed = idMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});
