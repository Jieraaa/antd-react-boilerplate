/* eslint-disable no-restricted-syntax */
import fetch from './fetch';

const PROXY_TO_API = 'proxy_to_api/';

const Api = {
	host: {
		main: PROXY_TO_API,
	},

	path: {
		getUserRepo: 'users/{0}/repos',
	},

	/**
	 * 拼接path
	 * @param path eg. /login
	 * @param params eg. username,...
	 */
	assemblePath(path, ...params) {
		let newPath = path;
		const len = params.length;
		for (let i = 0; i < len; i++)	{
			newPath = newPath.replace(new RegExp(`\\{${i}\\}`, 'g'), params[i]);
		}
		return newPath;
	},
	/**
	 * 拼接一个可以访问的url
	 * @param host eg. http://kcsj.leanapp.cn
	 * @param path eg. /login
	 * @param queryObject eg. {name: 'xunaixuan', phone: '18610351888'}
	 */
	assembleUrl(host, path, queryObject) {
		return host + path + this.assembleQueryParams(queryObject);
	},

	/**
	 * 将一个object转为一个query类型的string
	 * @param object
	 * @returns {string}
	 */
	assembleQueryParams(object) {
		let query = '';
		let index = 0;
		for (const key in object) {
			if (index === 0) {
				query += `?${key}=${object[key]}`;
			} else {
				query += `&${key}=${object[key]}`;
			}
			index++;
		}
		return query;
	},
	request(url, successCallback, errorCallback) {
		fetch(url,
			{
				headers: {
					'Content-Type': 'application/json',
					// 'Cookies': 'test'
				},
			}
		)
			.then(response => response.json())
			.then(response => {
				successCallback && successCallback(response);
			})
			.catch(error => {
				errorCallback && errorCallback(error);
			});
	},

	requestPost(url, data, successCallback, errorCallback) {
		fetch(url,
			{
				headers: {
					'Content-Type': 'application/json',
					// 'Cookies': 'test'
				},
				method: 'POST',
				body: JSON.stringify(data),
			}
		)
			.then(response => response.json())
			.then(response => {
				successCallback && successCallback(response);
			})
			.catch(error => {
				errorCallback && errorCallback(error);
			});
	},

	uploadFile(url, data, successCallback, errorCallback) {
		fetch(url, {
			method: 'POST',
			body: data,
		})
			.then(response => response.json())
			.then(response => {
				successCallback && successCallback(response);
			})
			.catch(error => {
			errorCallback && errorCallback(error);
		});
	},
};

export default Api;
