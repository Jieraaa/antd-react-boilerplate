/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Api from './../../utils/Api';
import Layout from './../../components/Layout';

export default class HomePage extends React.PureComponent {

	handleClick() {
		const username = 'merrier';
		const path = Api.assemblePath(Api.path.getUserRepo, username);
		const data = { type: 'all', sort: 'updated' };
		const url = Api.assembleUrl(Api.host.main, path, data);
		Api.request(url, (res) => {
			console.info(res);
		});
		Api.request(url, (res) => {
			console.info(res);
		});
	}

	render() {
		return (
			<Layout>
				<input type="button" onClick={() => this.handleClick()} value="点我吧" />
			</Layout>
		);
	}

}
