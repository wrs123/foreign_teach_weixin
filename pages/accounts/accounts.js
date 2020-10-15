// pages/accounts/accounts.js
const app = getApp()
let that = this;
Page({
  data: {
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    menuBotton: app.globalData.menuBotton,//导航栏距离顶部距离
    menuHeight: app.globalData.menuHeight,
    screenHeight: wx.getSystemInfoSync().windowHeight
  },
  onLoad:function(options){
    this.changeNavType();
    // 页面初始化 options为页面跳转所带来的参数
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let ratio = 750 / clientWidth;
        let height = clientHeight * ratio;
        that.setData({
          screenHeight: height
        });
      }
    });
  },
  changeNavType: function(){
    wx.setNavigationBarColor({
        frontColor: '#ffffff',
        backgroundColor: '#ffffff',
        animation: {
          duration: 30,
          timingFunc: 'linear'
        }
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})