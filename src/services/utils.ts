import { json } from 'react-router-dom';
import { API } from '../lib/environment';

const isAbsoluteUrl = (url: string): boolean => {
	try {
		const parsedURL = new URL(url);
		return parsedURL.protocol !== '';
	} catch (error) {
		return false;
	}
};
const replaceOrigin = (url: string, newOrigin: string) => {
	const parsedURL = new URL(url);
	const newParsedURL = new URL(newOrigin);

	parsedURL.protocol = newParsedURL.protocol;
	parsedURL.host = newParsedURL.host;
	parsedURL.port = newParsedURL.port;

	return parsedURL.toString();
};
const fetchCallbackGet = async <T extends unknown>(
	url: string,
	sessionKey: string,
): Promise<{ data: T; response: Response }> => {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${window.btoa(`${sessionKey}:someotherstring`)}`,
		},
	});

	const data = await response.json();
	return { data, response };
};

export const fetchDataPost = async <T extends unknown>(
	url: string,
	body: any,
	sessionKey?: string,
): Promise<{ data: T; response: Response }> => {
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};

	if (sessionKey) {
		headers.Authorization = `Basic ${window.btoa(
			`${sessionKey}:someotherstring`,
		)}`;
	}

	const response = await fetch(url, {
		method: 'POST',
		headers,
		body: JSON.stringify(body),
	});

	let data = {} as T;
	const contentType = response.headers.get('content-type');
	if (contentType && contentType.includes('application/json')) {
		data = await response.json();
	}

	return { data, response };
};

export const fetchDataPut = async <T extends unknown>(
	url: string,
	body: any,
	sessionKey: string,
): Promise<{ data: T; response: Response }> => {
	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${window.btoa(`${sessionKey}:someotherstring`)}`,
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return { data, response };
};

export const authenticatedFetch = async <T extends unknown>(
	url: string,
	sessionKey: string,
	method: string = 'GET',
	body: any = null,
): Promise<{ data: T; response: Response }> => {
	// if PUT method, use fetchDataPut
	if (method === 'PUT') {
		if (isAbsoluteUrl(url)) {
			const newUrl = replaceOrigin(url, API);
			return fetchDataPut<T>(newUrl, body, sessionKey);
		}
		return fetchDataPut<T>(`${API}${url}`, body, sessionKey);
	} else if (method === 'POST') {
		if (isAbsoluteUrl(url)) {
			const newUrl = replaceOrigin(url, API);
			return fetchDataPost<T>(newUrl, body, sessionKey);
		}
		return fetchDataPost<T>(`${API}${url}`, body);
	} else if (method === 'GET') {
		// default to GET method
		if (isAbsoluteUrl(url)) {
			const newUrl = replaceOrigin(url, API);
			return fetchCallbackGet<T>(newUrl, sessionKey);
		}
		return fetchCallbackGet<T>(`${API}${url}`, sessionKey);
	}

	throw new Error('Invalid method, not supported');
};
export const badRequest = <T extends unknown>(data: T) =>
	json(data, { status: 400 });
export const unauthorized = <T extends unknown>(data: T) =>
	json(data, { status: 401 });
