import { isUri, isWebUri } from 'valid-url'

import { ExtractError } from './core'
import { StringMarshaller } from './string'


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