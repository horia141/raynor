# Raynor [![npm version](https://badge.fury.io/js/raynor.svg)](https://badge.fury.io/js/raynor) [![Build Status](https://travis-ci.org/horia141/raynor.svg?branch=master)](https://travis-ci.org/horia141/raynor) [![Coverage](https://codecov.io/gh/horia141/raynor/branch/master/graph/badge.svg)](https://codecov.io/gh/horia141/raynor) [![License]](https://img.shields.io/badge/license-MIT-blue.svg)

A TypeScript marshalling and data validation library.

See [this article](http://horia141.com/raynor.html) for a tutorial and introduction to Raynor.

We'll add more docs with time, but here's a quick example:

```js
class User {
    @MarshalWith(StringMarshaller)
    name: string;
    @MarshalWith(ArrayOf(NumberMarshaller))
    scoresByDay: number[];

    totalScore(): number {
        return this.scoresByDay.reduce((a,b) => a + b, 0);
    }
}

const um = new (MarshalFrom(User))();
const u = um.extract(JSON.parse('{"name": "Raynor", "scoresByDay": [10, 20, 30]}'));
console.log(u.totalScore()); // Prints 60
```

