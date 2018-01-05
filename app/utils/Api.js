import fetch from './fetch';

const PROXY_TO_API = 'proxy_to_api/';

const Api = {
	host: {
		main: PROXY_TO_API,
	},

	path: {
		// 登录接口 username:用户名 password:密码
		getUserRepo: 'users/{0}/repos',
	},

	/**
	 * 拼接一个可以访问的url
	 * @param path eg. /login
	 * @param params eg. username,...
	 */
	assembleUrl(path, ...params) {
		let newPath = path;
		const len = params.length;
		for (let i = 0; i < len; i++)	{
			newPath = newPath.replace(new RegExp(`\\{${i}\\}`, 'g'), params[i]);
		}
		return newPath;
	},
	/*
	* 拼接文件上传的url
	* @param path eg. /uploadFile
	* */
	assembleFileUrl(path) {
		return this.host.apiMain + path;
	},

	request(url, data, successCallback, errorCallback) {
		fetch(url,
			{
				// headers: {"Cookies": 'test'},
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
