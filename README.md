# Raynor [![npm version](https://badge.fury.io/js/raynor.svg)](https://badge.fury.io/js/raynor) [![Build Status](https://travis-ci.org/horia141/raynor.svg?branch=master)](https://travis-ci.org/horia141/raynor) [![Coverage](https://codecov.io/gh/horia141/raynor/branch/master/graph/badge.svg)](https://codecov.io/gh/horia141/raynor)

A TypeScript marshalling library.

See [this article](http://horia141.com/raynor.html) for a tutorial and introduction to Raynor.

We'll add more docs with time, but here's a quick example:

{% highlight js %}
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
const u = new.extract(JSON.parse('{"name": "Raynor", "scoresByDay": [10, 20, 30]}'));
console.log(u.totalScore()); // Prints 60
{% endhighlight %}
