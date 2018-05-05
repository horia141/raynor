import { expect } from 'chai'
import 'mocha'

import {
    PathAndQueryAndFragmentMarshaller,
    SecureWebUriMarshaller,
    SlugMarshaller,
    UriMarshaller,
    WebUriMarshaller
} from './uri';


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
        { hello: 'hello' }
    ];

    describe('extract', () => {
        for (const uri of Uris) {
            it(`should parse ${uri}`, () => {
                const uriMarshaller = new UriMarshaller();

                expect(uriMarshaller.extract(uri)).to.equal(uri);
            });
        }

        for (const nonUri of NonUris) {
            it(`should throw for invalid uri ${nonUri}`, () => {
                const uriMarshaller = new UriMarshaller();

                expect(() => uriMarshaller.extract(nonUri)).to.throw('Expected an URI');
            });
        }

        for (const nonString of NonStrings) {
            it(`should throw for ${JSON.stringify(nonString)}`, () => {
                const uriMarshaller = new UriMarshaller();

                expect(() => uriMarshaller.extract(nonString)).to.throw('Expected a string');
            });
        }
    });

    describe('pack', () => {
        for (const uri of Uris) {
            it(`should produce the same input for ${uri}`, () => {
                const uriMarshaller = new UriMarshaller();

                expect(uriMarshaller.pack(uri)).to.equal(uri);
            });
        }
    });

    describe('extract and pack', () => {
        for (const uri of Uris) {
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
        { hello: 'hello' }
    ];

    describe('extract', () => {
        for (const uri of WebUris) {
            it(`should parse ${uri}`, () => {
                const webUriMarshaller = new WebUriMarshaller();

                expect(webUriMarshaller.extract(uri)).to.equal(uri);
            });
        }

        for (const nonWebUri of NonWebUris) {
            it(`should throw for ${JSON.stringify(nonWebUri)}`, () => {
                const webUriMarshaller = new WebUriMarshaller();

                expect(() => webUriMarshaller.extract(nonWebUri)).to.throw('Expected an http/https URI');
            });
        }

        for (const nonUri of NonUris) {
            it(`should throw for ${JSON.stringify(nonUri)}`, () => {
                const webUriMarshaller = new WebUriMarshaller();

                expect(() => webUriMarshaller.extract(nonUri)).to.throw('Expected an URI');
            });
        }

        for (const nonString of NonStrings) {
            it(`should throw for ${JSON.stringify(nonString)}`, () => {
                const webUriMarshaller = new WebUriMarshaller();

                expect(() => webUriMarshaller.extract(nonString)).to.throw('Expected a string');
            });
        }
    });

    describe('pack', () => {
        for (const uri of WebUris) {
            it(`should produce the same input for ${uri}`, () => {
                const webUriMarshaller = new WebUriMarshaller();

                expect(webUriMarshaller.pack(uri)).to.equal(uri);
            });
        }
    });

    describe('extract and pack', () => {
        for (const uri of WebUris) {
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
        { hello: 'hello' }
    ];

    describe('extract', () => {
        for (const uri of SecureWebUris) {
            it(`should parse ${uri}`, () => {
                const secureWebUriMarshaller = new SecureWebUriMarshaller();

                expect(secureWebUriMarshaller.extract(uri)).to.equal(uri);
            });
        }

        for (const nonSecureWebUri of NonSecureWebUris) {
            it(`should throw for ${JSON.stringify(nonSecureWebUri)}`, () => {
                const secureWebUriMarshaller = new SecureWebUriMarshaller();

                expect(() => secureWebUriMarshaller.extract(nonSecureWebUri)).to.throw('Expected an https URI');
            });
        }

        for (const nonWebUri of NonWebUris) {
            it(`should throw for ${JSON.stringify(nonWebUri)}`, () => {
                const secureWebUriMarshaller = new SecureWebUriMarshaller();

                expect(() => secureWebUriMarshaller.extract(nonWebUri)).to.throw('Expected an http/https URI');
            });
        }

        for (const nonUri of NonUris) {
            it(`should throw for ${JSON.stringify(nonUri)}`, () => {
                const secureWebUriMarshaller = new SecureWebUriMarshaller();

                expect(() => secureWebUriMarshaller.extract(nonUri)).to.throw('Expected an URI');
            });
        }

        for (const nonString of NonStrings) {
            it(`should throw for ${JSON.stringify(nonString)}`, () => {
                const secureWebUriMarshaller = new SecureWebUriMarshaller();

                expect(() => secureWebUriMarshaller.extract(nonString)).to.throw('Expected a string');
            });
        }
    });

    describe('pack', () => {
        for (const uri of SecureWebUris) {
            it(`should produce the same input for ${uri}`, () => {
                const secureWebUriMarshaller = new SecureWebUriMarshaller();

                expect(secureWebUriMarshaller.pack(uri)).to.equal(uri);
            });
        }
    });

    describe('extract and pack', () => {
        for (const uri of SecureWebUris) {
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


describe('QueryParamsAndFragmentMarshaller', () => {
    const PathAndQueryAndFragments = [
        '/',
        '/hello',
        '/is-it-me',
        '/a/double/path',
        '/?id=10',
        '/special#fragment',
        '/both?aquery=and#a-fragment'
    ];

    const PathAndQueryAndFragmentsWithAHostname = [
        'https://example.com',
        'https://example.com/a-bad/case',
        'https://example.com#foo'
    ];

    const RelativePathAndQueryAndFragments = [
        '../foo',
        'a-relative-path',
        '/a/../relative-path',
        '/a/special/../../path',
        '../foo?id=10',
        'a-relative-path?id=10',
        '/a/../relative-path?id=10',
        '/a/special/../../path?id=10'
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
        { hello: 'hello' }
    ];

    describe('extract', () => {
        for (const example of PathAndQueryAndFragments) {
            it(`should parse "${example}"`, () => {
                const marshaller = new PathAndQueryAndFragmentMarshaller();

                expect(marshaller.extract(example)).to.equal(example);
            });
        }

        for (const badExample of PathAndQueryAndFragmentsWithAHostname) {
            it(`should throw when hostname is present "${badExample}"`, () => {
                const marshaller = new PathAndQueryAndFragmentMarshaller();

                expect(() => marshaller.extract(badExample)).to.throw('Expected just an absolute path');
            });
        }

        for (const badExample of RelativePathAndQueryAndFragments) {
            it(`should throw when a relative path is present "${badExample}"`, () => {
                const marshaller = new PathAndQueryAndFragmentMarshaller();

                expect(() => marshaller.extract(badExample)).to.throw('Expected an absolute path');
            });
        }

        for (const nonString of NonStrings) {
            it(`should throw for ${JSON.stringify(nonString)}`, () => {
                const marshaller = new PathAndQueryAndFragmentMarshaller();

                expect(() => marshaller.extract(nonString)).to.throw('Expected a string');
            });
        }
    });

    describe('pack', () => {
        for (const example of PathAndQueryAndFragments) {
            it(`should produce the same input for "${example}"`, () => {
                const marshaller = new PathAndQueryAndFragmentMarshaller();

                expect(marshaller.pack(example)).to.equal(example);
            });
        }
    });

    describe('extract and pack', () => {
        for (const example of PathAndQueryAndFragments) {
            it(`should be opposites for "${example}"`, () => {
                const marshaller = new PathAndQueryAndFragmentMarshaller();

                const raw = example;
                const extracted = marshaller.extract(raw);
                const packed = marshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});


describe('SlugMarshaller', () => {
    const Slugs = [
        'hello',
        'is-it-me-youre-looking-for',
        'a-special-slug'
    ];

    const NonSlugs = [
        '',
        '   ',
        '-hello',
        'hello-',
        '-',
        '  - ',
        '--',
        'is--it--me--youre--looking--for',
        'foo@bar',
        'CApital-letters',
        'http://<foo>',
        'str\'ange',
        'c"haracters',
        'evén-some-unicode'
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
        { hello: 'hello' }
    ];

    describe('extract', () => {
        for (const slug of Slugs) {
            it(`should parse ${slug}`, () => {
                const slugMarshaller = new SlugMarshaller();

                expect(slugMarshaller.extract(slug)).to.equal(slug);
            });
        }

        for (const nonSlug of NonSlugs) {
            it(`should throw for invalid slug ${nonSlug}`, () => {
                const slugMarshaller = new SlugMarshaller();

                expect(() => slugMarshaller.extract(nonSlug)).to.throw('Expected a slug');
            });
        }

        for (const nonString of NonStrings) {
            it(`should throw for ${JSON.stringify(nonString)}`, () => {
                const slugMarshaller = new SlugMarshaller();

                expect(() => slugMarshaller.extract(nonString)).to.throw('Expected a string');
            });
        }
    });

    describe('pack', () => {
        for (const slug of Slugs) {
            it(`should produce the same input for ${slug}`, () => {
                const slugMarshaller = new SlugMarshaller();

                expect(slugMarshaller.pack(slug)).to.equal(slug);
            });
        }
    });

    describe('extract and pack', () => {
        for (const slug of Slugs) {
            it(`should be opposites for ${slug}`, () => {
                const slugMarshaller = new SlugMarshaller();

                const raw = slug;
                const extracted = slugMarshaller.extract(raw);
                const packed = slugMarshaller.pack(extracted);

                expect(packed).to.equal(raw);
            });
        }
    });
});
