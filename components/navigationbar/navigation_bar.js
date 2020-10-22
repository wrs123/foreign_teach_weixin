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
    },
    isback: {
      type: Boolean,
      value: false
    },
    isSearch: {
      type: Boolean,
      value: false
    },
    bottomBorder: {
      type: Boolean,
      value: false
    }
  },
  data: {
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    menuBotton: app.globalData.menuBotton,//导航栏距离顶部距离
    menuHeight: app.globalData.menuHeight, //导航栏高度
    menuRight: app.globalData.menuRight,
    menuWidth: app.globalData.menuWidth,
    searchWidth: app.globalData.screenWidth-(app.globalData.menuWidth+(app.globalData.menuRight*2)+40+app.globalData.menuRight),
    screenWidth: app.globalData.screenWidth
  },
  methods: {
    customMethod: function(){},
    //路由返回
    backPage: function(){
      wx.navigateBack()
    }
  }
});
