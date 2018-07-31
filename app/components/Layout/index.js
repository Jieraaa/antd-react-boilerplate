import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
import './index.css';
import menu from './menu';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

class MyLayout extends React.Component {

  state = {
    collapsed: false,
    currentSelect: [],
    currentOpen: [],
  };

  componentWillMount() {
    const pathname = location.pathname,
      filterOpen = [],
      filterSelect = [];
    for (let index = 0, len = menu.length; index < len; index++) {
      let item = menu[index];
      if ('subMenu' in item) {
        if (pathname.indexOf(item.path) > -1) {
          filterOpen.push(item.key);
          if (pathname.replace(/\//g, '') === item.path.replace(/\//g, '')) {
            filterSelect.push(item.subMenu[0].key);
          } else {
            for (let i = 0, l = item.subMenu.length; i < l; i++) {
              let subItem = item.subMenu[i];
              if (pathname.indexOf(subItem.path) > -1) {
                filterSelect.push(subItem.key);
              }
            }
          }
        }
      } else {
        if (pathname.indexOf(item.path) > -1) {
          filterSelect.push(item.key);
        }
      }
    }
    this.setState({
      currentSelect: filterSelect,
      currentOpen: filterOpen,
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { currentSelect, currentOpen } = this.state;
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo"/>
          <Menu theme="dark"
                mode="inline"
                defaultSelectedKeys={currentSelect}
                defaultOpenKeys={currentOpen}
          >
            {
              menu.map(item => {
                if ('subMenu' in item) {
                  return (<SubMenu
                    key={item.key}
                    title={<span><Icon type="team"/><span>Team</span></span>}
                  >
                    {item.subMenu.map(i =>
                      <MenuItem
                        key={i.key}
                        onClick={(e) => {
                          this.setState({
                            currentSelect: [e.key],
                          });
                        }
                        }
                      >
                        <Link to={`${item.path}${i.path}`}>{i.title}</Link>
                      </MenuItem>,
                    )}
                  </SubMenu>);
                } else {
                  return (<MenuItem
                    key={item.key}
                    onClick={(e) => {
                      this.setState({
                        currentSelect: [e.key],
                      });
                    }
                    }
                  >
                    <Link to={item.path}>
                      <Icon type="user"/>
                      <span>Home</span>
                    </Link>
                  </MenuItem>);
                }
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            {React.Children.toArray(this.props.children)}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default MyLayout;
