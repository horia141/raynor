import { expect } from 'chai'
import 'mocha'

import { AbsolutePathMarshaller } from './path'


describe('AbsolutePathMarshaller', () => {
    const AbsolutePaths = [
	'/',
	'/hello',
	'/hello-world',
	'/hello/world',
	'/hello/world/',
	'/this/is/a/very-long/path',
	'/12/other-characters'
    ];

    const NonAbsolutePaths = [
	'',
	'hello',
	'-yello',
	'..yello',
	'/-hello',
	'/t-',
	'/true+w',
	'//hello',
	'/hello//',
	'../hello',
	'./hello',
	'/speßial'
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
    	for (let path of AbsolutePaths) {
    	    it(`should parse ${path}`, () => {
    		const absolutePathMarshaller = new AbsolutePathMarshaller();

    		expect(absolutePathMarshaller.extract(path)).to.equal(path);
    	    });
    	}

    	for (let path of NonAbsolutePaths) {
    	    it(`should throw for non-absolute ${path}`, () => {
    		const absolutePathMarshaller = new AbsolutePathMarshaller();

    		expect(() => absolutePathMarshaller.extract(path)).to.throw('Expected an absolute path');
    	    });
    	}

    	for (let nonString of NonStrings) {
    	    it(`should throw for ${JSON.stringify(nonString)}`, () => {
    		const absolutePathMarshaller = new AbsolutePathMarshaller();

    		expect(() => absolutePathMarshaller.extract(nonString)).to.throw('Expected a string');
    	    });
    	}
    });

    describe('pack', () => {
    	for (let path of AbsolutePaths) {
    	    it(`should produce the same input for ${path}`, () => {
    		const absolutePathMarshaller = new AbsolutePathMarshaller();

    		expect(absolutePathMarshaller.pack(path)).to.equal(path);
    	    });
    	}	
    });

    describe('extract and pack', () => {
        for (let path of AbsolutePaths) {
            it(`should be opposites for ${path}`, () => {
                const absolutePathMarshaller = new AbsolutePathMarshaller();

                const raw = path;
    		const extracted = absolutePathMarshaller.extract(raw);
    		const packed = absolutePathMarshaller.pack(extracted);

    		expect(packed).to.equal(raw);
            });
        }
    });
});
