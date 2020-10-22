// components/loadWidget/loadingWidget.js
var app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    textColor: {
      type: String,
      value: '#727272'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeigBarHeight: app.globalData.navBarHeight,
    screenHeight: app.globalData.screenHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
