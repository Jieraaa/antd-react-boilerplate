import React from 'react';
import {browserHistory} from 'react-router';
import {Layout, Menu, Icon} from 'antd';
import Const from './../../utils/Const';
import './Layout.css';
const {Header, Footer, Sider, Content} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default class LayoutBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

	static propTypes = {
		children: React.PropTypes.node,
	};

	handleClick = (item) => {
		browserHistory.push(item.key);
		this.setState({
			path: item.key,
		});
	};

	render() {
		return (
			<Layout>
					<Sider
						width={256}
						style={{
							position: 'fixed',
							height: '100vh',
							left: 0,
							overflow: 'auto',
							background: 'rgb(0, 21, 41)',
							boxShadow: '2px 0 6px rgba(0, 21, 41, .35)',
						}}
					>
						<div className="layout-logo" onClick={() => { browserHistory.push(Const.route.LOGIN); }}>青聪岁悦</div>
						<Menu
							className="layout_menu"
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							mode="inline"
							theme="dark"
							style={{background: 'rgb(0, 21, 41)'}}
							onClick={this.handleClick}
						>
							<MenuItem key="page1">
								<Icon type="pie-chart"/>
								<span>Option 1</span>
							</MenuItem>
							<MenuItem key="test">
								<Icon type="desktop"/>
								<span>Option 2</span>
							</MenuItem>
							<MenuItem key="3">
								<Icon type="desktop"/>
								<span>Option 3</span>
							</MenuItem>
							<SubMenu key="sub1" title={<span><Icon type="mail"/><span>Navigation One</span></span>}>
								<MenuItem key="5">Option 5</MenuItem>
								<MenuItem key="6">Option 6</MenuItem>
								<MenuItem key="7">Option 7</MenuItem>
								<MenuItem key="8">Option 8</MenuItem>
							</SubMenu>
							<SubMenu key="sub2" title={<span><Icon type="appstore"/><span>Navigation Two</span></span>}>
								<MenuItem key="9">Option 9</MenuItem>
								<MenuItem key="10">Option 10</MenuItem>
								<SubMenu key="sub3" title="Submenu">
									<MenuItem key="11">Option 11</MenuItem>
									<MenuItem key="12">Option 12</MenuItem>
								</SubMenu>
							</SubMenu>
						</Menu>
					</Sider>
					<Layout style={{marginLeft: 256, minWidth: 960}}>
						<Header style={{background: '#fff', padding: 0}}>
						</Header>
						<Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
							<div style={{padding: 24, background: '#fff', textAlign: 'center', minHeight: 'calc(100vh - 154px)'}}>
								{React.Children.toArray(this.props.children)}
							</div>
						</Content>
						<Footer style={{textAlign: 'center'}}>
							青聪岁悦 Copyright © 2017-2018 京ICP备XXXXXXXX号
						</Footer>
					</Layout>
				</Layout>
		);
	}
}
