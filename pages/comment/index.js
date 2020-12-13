// pages/comment/index.js
import create from '../../utils/create'
import store from '../../store'
import Api from '../../utils/api'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify'

const app = getApp()

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    load: false,
    error: false,
    commentList: [],
    stars: ['','','','','']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCommentList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getCommentList: function(){
    if(!this.data.load){
      let that = this
      let data = {
        userId: this.store.data.openId
      }
      Api.userComment(data, function(res){
        console.log(res)
        if(res.code == 200 && res.status == 'success'){
          that.setData({
            commentList: res.result.resultList,
            load: false
          })
          return true
        }
        that.setData({
        
          load: false
        })
        Notify({ type: 'danger', message: res.message})
      })
    }
    }  
})