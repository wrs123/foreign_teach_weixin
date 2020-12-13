// pages/commentPost/index.js
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
    courseId: 0,
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    courseName: '',
    wacId: 0,
    cover: '',
    courseType: '',
    courseTypeMap: {
      0: '小学',
      1: '初中',
      2: '高中',
      3: '大学'
    },
    stars: [1,2,3,4,5],
    star: 0,
    commentCotent: '',
    post: false,
    error: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //存储课程id
    this.setData({
      courseId: options.courseId,
      courseName: options.name,
      cover: options.cover,
      courseType: options.courseType,
      wacId: options.wacId
    })
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
  starTap: function(e){
    let item = e.target.dataset.index
    this.setData({
      star: item
    })
  },
  post: function(e){
    if(!this.data.post){
      this.setData({
        post: true,
        error: false
      })
      let star,content,that 
      that = this
      star = this.data.star
      content = e.detail.value.textarea

      if(star == 0){
        Notify({ type: 'danger', message: '评级不能为空' })
        return false
      }
      if(content == ''){
        Notify({ type: 'danger', message: '评论内容不能为空'})
        return false
      }
      let data = {
        star: star,
        content: content,
        courseId: this.data.courseId,
        userId: this.store.data.openId,
        wacId: this.data.wacId
      }

      Api.commentPost(data, function(res){
        console.log(res)
        if(res.code == 200 && res.status == 'success'){
          that.setData({
            post: false
          })
          wx.redirectTo(
            {
              url: '/pages/comment/index'
            }
          )
          return true
        }
        Notify({ type: 'danger', message: res.message})
      })
    }
    
  }
})