const app = getApp()

Component({
  properties: {
    title: {
      type: String,
      value: '我的',
    },
    fontColor: {
      type: String,
      value: '#333'
    },
    backgroundColor: {
      type: String,
      value: 'white'
    }
  },
  data: {
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    menuBotton: app.globalData.menuBotton,//导航栏距离顶部距离
    menuHeight: app.globalData.menuHeight //导航栏高度
  },
  methods: {
    customMethod: function(){}
  }
});
