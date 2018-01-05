/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { browserHistory } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
import cookie from 'react-cookies';
import './App.css';

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

	static propTypes = {
		children: React.PropTypes.node,
	};

	constructor(props) {
		super(props);
		this.state = {
			isLogin: false,
			path: '',
		};
	}

	componentWillMount() {
		const path = browserHistory.getCurrentLocation().pathname;
		if (path.indexOf('login') > -1) {
			this.setState({
				path,
			});
		}
	}

	componentDidMount() {
		const id = cookie.load('id');
		if (id) {
			this.setState({
				isLogin: true,
				path: browserHistory.getCurrentLocation().pathname,
			});
		} else {
			browserHistory.push('/login');
			this.setState({
				path: '/login',
			});
		}
	}

	handleClick = (item) => {
		browserHistory.push(item.key);
		this.setState({
			path: item.key,
		});
	}

	login() {
		browserHistory.push('/login');
		this.setState({
			path: 'login',
		});
	}

	render() {
		return (
			this.state.isLogin && this.state.path.indexOf('login') < 0 ?
  <Layout>
    <Sider
      width={256}
      style={{ position: 'fixed', height: '100vh', left: 0, overflow: 'auto', background: 'rgb(0, 21, 41)', boxShadow: '2px 0 6px rgba(0, 21, 41, .35)' }}
    >
      <div className="logo" onClick={() => this.login()}>青聪岁悦</div>
      <Menu
        className="layout_menu"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        style={{ background: 'rgb(0, 21, 41)' }}
        onClick={this.handleClick}
      >
        <MenuItem key="page1">
          <Icon type="pie-chart" />
          <span>Option 1</span>
        </MenuItem>
        <MenuItem key="test">
          <Icon type="desktop" />
          <span>Option 2</span>
        </MenuItem>
        <MenuItem key="3">
          <Icon type="test" />
          <span>Option 3</span>
        </MenuItem>
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
          <MenuItem key="5">Option 5</MenuItem>
          <MenuItem key="6">Option 6</MenuItem>
          <MenuItem key="7">Option 7</MenuItem>
          <MenuItem key="8">Option 8</MenuItem>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
          <MenuItem key="9">Option 9</MenuItem>
          <MenuItem key="10">Option 10</MenuItem>
          <SubMenu key="sub3" title="Submenu">
            <MenuItem key="11">Option 11</MenuItem>
            <MenuItem key="12">Option 12</MenuItem>
          </SubMenu>
        </SubMenu>
      </Menu>
    </Sider>
    <Layout style={{ marginLeft: 256, minWidth: 960 }}>
      <Header style={{ background: '#fff', padding: 0 }}>
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, background: '#fff', textAlign: 'center', minHeight: 'calc(100vh - 154px)' }}>
          {React.Children.toArray(this.props.children)}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
							青聪岁悦 Copyright © 2017-2018 京ICP备XXXXXXXX号
						</Footer>
    </Layout>
  </Layout>
				:
  <div>{React.Children.toArray(this.props.children)}</div>
		);
	}
}
