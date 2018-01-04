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
import format from './../../utils/format'

export default class HomePage extends React.PureComponent {
  handleClick(){
    let username='merrier';
    let path = Api.path.getUserRepo.format(username);
		let url = Api.assembleUrl(Api.host.main, path, {type:'all',sort:'updated'});
		console.info(url)
		Api.request(url, (data) => {
      console.info(data)
		})
  }

  render() {
    return (
      <h1>
        <input type="button" onClick={()=>this.handleClick()} value="点我吧"/>
      </h1>
    );
  }

}
