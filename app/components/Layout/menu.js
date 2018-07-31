const menu = [{
  title: "首页",
  path: "/homePage",
  key: 'menu0',
  icon: "user",
}, {
  title: "系统管理",
  key: 'menu1',
  path: "/systemManage",
  icon: "upload",
  subMenu: [
    {
      title: "Function管理",
      path: "/funcManage",
      key: 'sub0'
    }, {
      title: "菜单管理",
      path: "/menuManage",
      key: 'sub1'
    }
  ]
}];

export default menu;
