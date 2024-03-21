import axios, { Method, AxiosRequestConfig, AxiosResponse } from 'axios';

const defaultOptions: AxiosRequestConfig = {
	url: '/',
	method: 'POST',
	baseURL: 'http://localhost:5000/',
	data: {},
	timeout: 60000,
	maxRedirects: 5,
};

export const axiosInstance = (
	method: Method,
	url: string,
	data: Record<string, any> = {},
	options: AxiosRequestConfig = {},
): Promise<AxiosResponse<any, any>> => {
	const _options: AxiosRequestConfig = {
		...defaultOptions,
		...options,
		method: method,
		url: url,
		data: data,
	};

	const _instace = axios.create();
	return new Promise((resolve, reject) => {
		try {
			_instace(_options)
				.then((res) => {
					switch (res?.status) {
						case 200:
						case 201:
							resolve(res);
							break;
						case 400:
							reject(res);
							throw '400 Bad Request';
						case 500:
							reject(res);
							throw '500 Bad Request';
						default:
							console.log(`http status code : ${res?.status}`);
							resolve(res);
					}
				})
				.catch((e) => {
					switch (e?.response?.status) {
						case 401:
							reject(e?.response);
							throw '401 Error';
					}
				});
		} catch (e) {}
	});
};
