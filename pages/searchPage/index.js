// pages/searchPage/index.js
import create from '../../utils/create'
import store from '../../store'
import Api from '../../utils/api'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'

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
    searchWidth: app.globalData.screenWidth-(app.globalData.menuWidth+(app.globalData.menuRight*2)+100+app.globalData.menuRight),
    inputValue: '',
    load: false,
    courseList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  search: function(){
    if(!this.data.load){
      this.setData({
        load: true
      })
      let that = this
      let data = {coursename: this.data.inputValue}
      console.log(data)
    

      Api.search(data, res => {
        if(res.code == 200 && res.status == 'success'){
          that.setData({
            courseList: res.data.result.resultList,
            load: false
          })
        }else{
          that.setData({
            load: false
          })
          Notify({ type: 'danger', message: '搜索失败'})
        }
      })
    }
  },
  jumpToDetailsPage: function(e){
    let data = e.currentTarget.dataset.data
    data = JSON.stringify(data)
    console.log(data)
    wx.navigateTo({
      url: '/pages/courseDetails/courseDetails?data='+data
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  reurnPage: function(){
    wx.navigateBack()
  },
})