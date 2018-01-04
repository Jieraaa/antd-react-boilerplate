/*
 * 登录页面
 */

import React from 'react';
import cookie from 'react-cookies';
import './login.css';

export default class Login extends React.PureComponent {
	constructor(props){
		super(props);
	}

	handleLogin() {
		const opt = {
			path: '/',
		};
		let username = this.refs["username"].value;
		let password = this.refs["password"].value;
		cookie.save('id', 1, opt);
		location.href = './';
	}

	render() {
		return (
			<div className='login'>
				<div className='loginBox'>
					<h3 className='title'>青聪岁悦管理系统</h3>
					<input type="text" className='username' ref="username" placeholder="请填写用户名"/>
					<input type="password" className='password' ref="password" placeholder="请填写用户密码"/>
					<input type="submit" className='submitBtn' onClick={()=>this.handleLogin()} value="登 录"/>
				</div>
			</div>
		)
	}
}
