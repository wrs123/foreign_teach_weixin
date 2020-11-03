// pages/accounts/accounts.js
const app = getApp()

Page({
  data: {
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    menuBotton: app.globalData.menuBotton,//导航栏距离顶部距离
    menuHeight: app.globalData.menuHeight,
    screenHeight: wx.getSystemInfoSync().windowHeight,
    avatarUrl: '',
    nickName: 'NaN'
  },
  onLoad:function(options){
    //获取本地存储用户信息
    this.getUserInfo();
    this.changeNavType();
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
      }
    })

  },
  getUserInfo: function(){
    let that = this

    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        let info = res.data.userInfo

          that.setData({
            avatarUrl: info.avatarUrl,
            nickName: info.nickName
          })
      } 
    })

    wx.getStorage({
      key: 'nickName',
      success: function(res) {
          that.setData({
            nickName: res.data
          })
      } 
    })
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