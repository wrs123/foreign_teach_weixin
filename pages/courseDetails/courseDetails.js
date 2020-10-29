// pages/courseDetails/courseDetails.js
import create from '../../utils/create'
import store from '../../store'

//获取应用实例
var app = getApp();

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    menuBotton: app.globalData.menuBotton,//导航栏距离顶部距离
    menuHeight: app.globalData.menuHeight, //导航栏高度
    menuRight: app.globalData.menuRight,
    menuWidth: app.globalData.menuWidth,
    titleWidth: app.globalData.screenWidth-(app.globalData.menuWidth+(app.globalData.menuRight*2)+app.globalData.menuHeight+15),
    navShadow: false,
    screenWidth: app.globalData.screenWidth,
    barColor: '#fff',
    barbackground: 'rgba(255,255,255,0)',
    barType: 'dark',
    bannerHeight: app.globalData.screenWidth/16*11,
    tabs: ['简介', '评价'],
    tabTip: false,
    headTitleHeight: 0,
    tabBarTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.changeNavType('light')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getHeadTitleHeight()
  },
  //修改状态栏颜色
  changeNavType: function(type){
    let frontColor = '#ffffff'
    let backgroundColor = '#ffffff'

    if(type != this.data.barType){
      if(type == 'dark'){
        frontColor = '#000000'
        backgroundColor = '#000000'
      }
      wx.setNavigationBarColor({
          frontColor: frontColor,
          backgroundColor: backgroundColor,
          animation: {
            duration: 30,
            timingFunc: 'linear'
          }
      });
      this.setData({
        barType: type,
        barColor: type == 'light' ? '#fff' : '#333'
      })
    }
    
  },
  reurnPage: function(){
    wx.switchTab({
      url: '/pages/course/course' 
    })
  },
  onPageScroll: function(e){
    // console.log(e.scrollTop)
    if(e != null){
      let bannerHeight = this.data.bannerHeight
      let headHeight =  bannerHeight + this.data.headTitleHeight-this.data.navBarHeight+15
      let position = e.scrollTop;
      let offset = 1 / (bannerHeight-this.data.navBarHeight)
      
      if(position <= 30){
        this.changeNavType('light')
      }  
      else if(position > 30){
        this.changeNavType('dark')
        if(position >= headHeight && this.data.tabTip != true){
            this.setData({
              tabTip: true
            })
        }else if(position < headHeight && this.data.tabTip != false){
          this.setData({
            tabTip: false
          })
        }
      }  
      if(position <= bannerHeight-this.data.navBarHeight){
        this.setData({
          barbackground: 'rgba(255,255,255,'+position*offset+')'
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getHeadTitleHeight: function(){
    let that = this
    wx.createSelectorQuery().select('#headTitle').boundingClientRect(function(rect){
      that.setData({
        headTitleHeight: rect.height
      })
    }).exec()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})