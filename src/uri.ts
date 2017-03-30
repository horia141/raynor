import { isUri, isWebUri } from 'valid-url'

import { ExtractError } from './core'
import { StringMarshaller } from './string'

var slugify = require('slug');


export class UriMarshaller extends StringMarshaller {
    filter(a: string): string {
	if (!isUri(a)) {
	    throw new ExtractError('Expected an URI');
	}

	return a;
    }
}


export class WebUriMarshaller extends UriMarshaller {
    filter(uri: string): string {
	if (!isWebUri(uri)) {
	    throw new ExtractError('Expected an http/https URI');
	}

	return uri;
    }
}


export class SecureWebUriMarshaller extends WebUriMarshaller {
    filter(uri: string): string {
	if (uri.indexOf('https:') != 0) {
	    throw new ExtractError('Expected an https URI');
	}

	return uri;
    }
}


export class SlugMarshaller extends StringMarshaller {
    private static readonly _mode = (Object as any).assign({}, slugify.defaults.mode['pretty'], {lower: true});
	
    filter(inStr: string): string {
	var slug = slugify(inStr, SlugMarshaller._mode);
	
	if (slug.length == 0) {
	    throw new ExtractError('Expected a slug');
	}
	
	if (inStr != slug) {
	    throw new ExtractError('Expected a slug');
	}

	if (slug[0] == '-' || slug[slug.length-1] == '-') {
	    throw new ExtractError('Expected a slug');
	}

	return slug;
    }
}
