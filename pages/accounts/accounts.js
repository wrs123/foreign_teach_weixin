// pages/accounts/accounts.js
import Api from '../../utils/api'
import create from '../../utils/create'
import store from '../../store'

const app = getApp()

create(store,{
  data: {
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    menuBotton: app.globalData.menuBotton,//导航栏距离顶部距离
    menuHeight: app.globalData.menuHeight,
    screenHeight: wx.getSystemInfoSync().windowHeight,
    avatarUrl: '/images/no_account.jpeg',
    nickName: '点击头像登陆',
    isLogIn: false,
    openId: ''
  },
  onLoad:function(options){
    let that = this

    //设置状态栏颜色
    this.changeNavType();

    //获取本地存储用户信息
    wx.getStorage({
      key: 'openId',
      success: function(e){
        console.log(e)
        that.setData({
          isLogIn: true
        })
        that.store.data.openId = e.data
        that.update()
        //获取用户信息
        that.getUserInfo();
      },
      fail: function(e){
        console.log(e)
        
      }
    })

  },
  login: function(e){

    if (e.detail.userInfo) {
      let userInfo = e.detail.userInfo
      let global = app.globalData
      let that = this
      //用户按了允许授权按钮signature
      
      console.log(e)
      wx.login({
        success: function(d){
          Api.getOpenId(global.appId, global.appSecret, d.code, function(res){
         
            if(res.statusCode == 200){
              userInfo['avatarurl'] = userInfo.avatarUrl
              userInfo['openid'] = res.data.openid
              userInfo['nickname'] = userInfo.nickName
          
              Api.login(userInfo,function(ress){
                console.log(ress)
                if(ress.code == 200 && ress.message == "注册成功"){
                  wx.setStorage({
                    data: userInfo,
                    key: 'userInfo',
                  })
                  wx.setStorage({
                    data: res.data.openid,
                    key: 'openId',
                  })
                  that.setData({
                    isLogIn: true,
                    avatarUrl: userInfo.avatarUrl,
                    nickName: userInfo.nickName
                  })
                }
              }) 
            }
          })
        }
      })
     
  } else {
      //用户按了拒绝按钮
      wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
          showCancel: false,
          confirmText: '返回授权',
          success: function(res) {
              // 用户没有授权成功，不需要改变 isHide 的值
              if (res.confirm) {
                  console.log('用户点击了“返回授权”');
              }
          }
      });
  }

    
  },
  getUserInfo: function(){
    let that = this

    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        let info = res.data
          console.log(res)
          that.setData({
            avatarUrl: info.avatarUrl,
            nickName: info.nickName
          })
      } 
    })
  },
  jumpPage: function(e){
    let type = e.currentTarget.dataset.type

    console.log(type)

    wx.navigateTo({
      url: '/pages/order/order?type='+type
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
  },
  /**
   * 页面跳转
   * @param {} e 
   */
  jumpTo: function(e){
    let type = e.currentTarget.dataset.type

    console.log(type)
    wx.navigateTo({
      url: '/pages/coursePost/coursePost',
    })
  }
})