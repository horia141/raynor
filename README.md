# Raynor [![npm version](https://badge.fury.io/js/raynor.svg)](https://badge.fury.io/js/raynor) [![Build Status](https://travis-ci.org/horia141/raynor.svg?branch=master)](https://travis-ci.org/horia141/raynor) [![Coverage](https://codecov.io/gh/horia141/raynor/branch/master/graph/badge.svg)](https://codecov.io/gh/horia141/raynor)

A TypeScript marshalling library.

A very simple example, in lieu of better docs.

```javascript
import * as r from 'raynor'
import { ArrayOf, ExtractError, Marshaller, MarshalEnum, MarshalFrom, MarshalWith, OptionalOf } from 'raynor'


export enum Role {
    Unknown = 0,
    Regular = 1,
    Admin = 2
}


export class Stats {
    @MarshalWith(r.StringMarshaller)
    name: string;
    
    @MarshalWith(r.PositiveIntegerMarshaller)
    zergKilled: number;
}


export class User {
    @MarshalWith(r.IdMarshaller)
    id: number;

    @MarshalWith(MarshalEnum(Role))
    role: Role;

    @MarshalWith(r.StringMarshaller)
    name: string;

    @MarshalWith(r.UriMarshaller)
    pictureUri: string;

    @MarshalWith(ArrayOf(MarshalFrom(Stats)))
    stats: Stats[];

    constructor(id: number, role: Role, name: string, pictureUri: string) {
	this.id = id;
	this.role = role;
	this.name = name;
	this.pictureUri = pictureUri;
	this.stats = [];
    }

    isAdmin(): boolean {
        return this.role == Role.Admin;
    }
}


const userMarshaller = new (MarshalFrom(User))();

try {
    const user = userMarshaller.extract({
        "id": 10,
        "role": 2,
        "name": "Jimmy",
        "pictureUri": "https://example.com",
        "stats": [{
            "name": "Mission 1",
    	"zergKilled": 10
        }]
    });

    assert user.id == 1;
    assert user.role == Role.Admin;
    assert user.isAdmin() == true;
    assert user.name == "Jimmy";
    assert user.stats.length == 1;
    assert user.stats[0].name == "Mission 1";
    assert user.stats[0].zerkKilled == 10;

    console.log(JSON.stringify(userMarshaller.pack(user)));
} catch (e) {
    if (e.name instanceof ExtractError) {
        console.log('Could not extract');
    }

    throw e;
}


```