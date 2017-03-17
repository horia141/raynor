import { expect } from 'chai'
import 'mocha'

import { UriMarshaller, WebUriMarshaller } from './uri';


describe('UriMarshaller', () => {
    const Uris = [
	'http://google.com',
	'https://stackoverflow.com',
	'http://example.com/test',
        'https://www.example.com/',
        'https://www.example.com',
        'https://www.example.com/foo/bar/test.html',
        'https://www.example.com/?foo=bar',
        'https://www.example.com:8080/test.html',
        'http://www.example.com/',
        'http://www.example.com',
        'http://www.example.com/foo/bar/test.html',
        'http://www.example.com/?foo=bar',
        'http://www.example.com/?foo=bar&space=trucks',
        'http://www.example.com?foo=bar',        
        'http://www.example.com?foo=bar&space=trucks',
        'http://www.example.com:8080/test.html',
        'http://example.w3.org/path%20with%20spaces.html',
        'http://192.168.0.1/',
        'ftp://ftp.example.com',
        'https:www.example.com',
        'http:www.example.com'
    ];

    const NonUris = [
        '',
        'foo',
        'foo@bar',
        'http://<foo>',
        '://bob/',
        '1http://bob',
        '1http:////foo.html',
        'http://example.w3.org/%illegal.html',
        'http://example.w3.org/%a',
        'http://example.w3.org/%a/foo',
        'http://example.w3.org/%at'        
    ];

    const NonStrings = [
	null,
	undefined,
	NaN,
	Number.POSITIVE_INFINITY,
	Number.NEGATIVE_INFINITY,
	100,
	-20,
	[],
	['hello'],
	{},
	{hello: 'hello'}        
    ];

    describe('extract', () => {
	for (let uri of Uris) {
	    it(`should parse ${uri}`, () => {
		const uriMarshaller = new UriMarshaller();

		expect(uriMarshaller.extract(uri)).to.equal(uri);
	    });
	}

        for (let nonUri of NonUris) {
	    it(`should throw for invalid uri ${nonUri}`, () => {
		const uriMarshaller = new UriMarshaller();

		expect(() => uriMarshaller.extract(nonUri)).to.throw('Expected an URI');
	    });
	}

	for (let nonString of NonStrings) {
	    it(`should throw for ${JSON.stringify(nonString)}`, () => {
		const uriMarshaller = new UriMarshaller();

		expect(() => uriMarshaller.extract(nonString)).to.throw('Expected a string');
	    });
	}
    });

    describe('pack', () => {
        for (let uri of Uris) {
            it(`should produce the same input for ${uri}`, () => {
                const uriMarshaller = new UriMarshaller();

                expect(uriMarshaller.pack(uri)).to.equal(uri);
            });
        }
    });

    describe('extract and pack', () => {
        for (let uri of Uris) {
            it(`should be opposites for ${uri}`, () => {
                const uriMarshaller = new UriMarshaller();

                const raw = uri;
		const extracted = uriMarshaller.extract(raw);
		const packed = uriMarshaller.pack(extracted);

		expect(packed).to.equal(raw);
            });
        }
    });
});


describe('WebUriMarshaller', () => {
    const WebUris = [
	'http://google.com',
	'https://stackoverflow.com',
	'http://example.com/test',
        'https://www.example.com/',
        'https://www.example.com',
        'https://www.example.com/foo/bar/test.html',
        'https://www.example.com/?foo=bar',
        'https://www.example.com:8080/test.html',
        'http://www.example.com/',
        'http://www.example.com',
        'http://www.example.com/foo/bar/test.html',
        'http://www.example.com/?foo=bar',
        'http://www.example.com/?foo=bar&space=trucks',
        'http://www.example.com?foo=bar',        
        'http://www.example.com?foo=bar&space=trucks',
        'http://www.example.com:8080/test.html',
        'http://example.w3.org/path%20with%20spaces.html',
        'http://192.168.0.1/'
    ];

    const NonWebUris = [
        'ftp://ftp.example.com',
        'https:www.example.com',
        'http:www.example.com'
    ];

    const NonUris = [
        '',
        'foo',
        'foo@bar',
        'http://<foo>',
        '://bob/',
        '1http://bob',
        '1http:////foo.html',
        'http://example.w3.org/%illegal.html',
        'http://example.w3.org/%a',
        'http://example.w3.org/%a/foo',
        'http://example.w3.org/%at'
    ];

    const NonStrings = [
	null,
	undefined,
	100,
	-20,
	[],
	['hello'],
	{},
	{hello: 'hello'}
    ];

    describe('extract', () => {
	for (let uri of WebUris) {
	    it(`should parse ${uri}`, () => {
		const uriMarshaller = new WebUriMarshaller();

		expect(uriMarshaller.extract(uri)).to.equal(uri);
	    });
	}

	for (let nonString of NonStrings) {
	    it(`should throw for ${JSON.stringify(nonString)}`, () => {
		const uriMarshaller = new WebUriMarshaller();

		expect(() => uriMarshaller.extract(nonString)).to.throw('Expected a string');
	    });
	}
	
	for (let nonWebUri of NonWebUris) {
	    it(`should throw for ${JSON.stringify(nonWebUri)}`, () => {
		const uriMarshaller = new WebUriMarshaller();

		expect(() => uriMarshaller.extract(nonWebUri)).to.throw('Expected an http/https URI');
	    });
	}

	for (let nonUri of NonUris) {
	    it(`should throw for ${JSON.stringify(nonUri)}`, () => {
		const uriMarshaller = new WebUriMarshaller();

		expect(() => uriMarshaller.extract(nonUri)).to.throw('Expected an URI');
	    });
	}
    });

    describe('pack', () => {
        for (let webUri of WebUris) {
            it(`should produce the same input for ${webUri}`, () => {
                const webUriMarshaller = new WebUriMarshaller();

                expect(webUriMarshaller.pack(webUri)).to.equal(webUri);
            });
        }
    });

    describe('extract and pack', () => {
        for (let webUri of WebUris) {
            it(`should be opposites for ${webUri}`, () => {
                const webUriMarshaller = new WebUriMarshaller();

                const raw = webUri;
		const extracted = webUriMarshaller.extract(raw);
		const packed = webUriMarshaller.pack(extracted);

		expect(packed).to.equal(raw);
            });
        }
    });    
});
