import { expect } from 'chai'
import 'mocha'

import { SecureWebUriMarshaller, UriMarshaller, WebUriMarshaller } from './uri';


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
		const webUriMarshaller = new WebUriMarshaller();

		expect(webUriMarshaller.extract(uri)).to.equal(uri);
	    });
	}

	for (let nonWebUri of NonWebUris) {
	    it(`should throw for ${JSON.stringify(nonWebUri)}`, () => {
		const webUriMarshaller = new WebUriMarshaller();

		expect(() => webUriMarshaller.extract(nonWebUri)).to.throw('Expected an http/https URI');
	    });
	}

	for (let nonUri of NonUris) {
	    it(`should throw for ${JSON.stringify(nonUri)}`, () => {
		const webUriMarshaller = new WebUriMarshaller();

		expect(() => webUriMarshaller.extract(nonUri)).to.throw('Expected an URI');
	    });
	}

	for (let nonString of NonStrings) {
	    it(`should throw for ${JSON.stringify(nonString)}`, () => {
		const webUriMarshaller = new WebUriMarshaller();

		expect(() => webUriMarshaller.extract(nonString)).to.throw('Expected a string');
	    });
	}	
    });

    describe('pack', () => {
        for (let uri of WebUris) {
            it(`should produce the same input for ${uri}`, () => {
                const webUriMarshaller = new WebUriMarshaller();

                expect(webUriMarshaller.pack(uri)).to.equal(uri);
            });
        }
    });

    describe('extract and pack', () => {
        for (let uri of WebUris) {
            it(`should be opposites for ${uri}`, () => {
                const webUriMarshaller = new WebUriMarshaller();

                const raw = uri;
		const extracted = webUriMarshaller.extract(raw);
		const packed = webUriMarshaller.pack(extracted);

		expect(packed).to.equal(raw);
            });
        }
    });    
});


describe('SecureWebUriMarshaller', () => {
    const SecureWebUris = [
	'https://google.com',	
	'https://stackoverflow.com',
        'https://www.example.com/',
        'https://www.example.com',
        'https://www.example.com/foo/bar/test.html',
        'https://www.example.com/?foo=bar',
        'https://www.example.com:8080/test.html'
    ];

    const NonSecureWebUris = [
	'http://google.com',
	'http://stackoverflow.com',	
	'http://example.com/test',
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
	for (let uri of SecureWebUris) {
	    it(`should parse ${uri}`, () => {
		const secureWebUriMarshaller = new SecureWebUriMarshaller();

		expect(secureWebUriMarshaller.extract(uri)).to.equal(uri);
	    });
	}

	for (let nonSecureWebUri of NonSecureWebUris) {
	    it(`should throw for ${JSON.stringify(nonSecureWebUri)}`, () => {
		const secureWebUriMarshaller = new SecureWebUriMarshaller();

		expect(() => secureWebUriMarshaller.extract(nonSecureWebUri)).to.throw('Expected an https URI');
	    });
	}

	for (let nonWebUri of NonWebUris) {
	    it(`should throw for ${JSON.stringify(nonWebUri)}`, () => {
		const secureWebUriMarshaller = new SecureWebUriMarshaller();

		expect(() => secureWebUriMarshaller.extract(nonWebUri)).to.throw('Expected an http/https URI');
	    });
	}	

	for (let nonUri of NonUris) {
	    it(`should throw for ${JSON.stringify(nonUri)}`, () => {
		const secureWebUriMarshaller = new SecureWebUriMarshaller();

		expect(() => secureWebUriMarshaller.extract(nonUri)).to.throw('Expected an URI');
	    });
	}

	for (let nonString of NonStrings) {
	    it(`should throw for ${JSON.stringify(nonString)}`, () => {
		const secureWebUriMarshaller = new SecureWebUriMarshaller();

		expect(() => secureWebUriMarshaller.extract(nonString)).to.throw('Expected a string');
	    });
	}
    });

    describe('pack', () => {
        for (let uri of SecureWebUris) {
            it(`should produce the same input for ${uri}`, () => {
                const secureWebUriMarshaller = new SecureWebUriMarshaller();

                expect(secureWebUriMarshaller.pack(uri)).to.equal(uri);
            });
        }
    });

    describe('extract and pack', () => {
        for (let uri of SecureWebUris) {
            it(`should be opposites for ${uri}`, () => {
                const secureWebUriMarshaller = new SecureWebUriMarshaller();

                const raw = uri;
		const extracted = secureWebUriMarshaller.extract(raw);
		const packed = secureWebUriMarshaller.pack(extracted);

		expect(packed).to.equal(raw);
            });
        }
    });    
});
