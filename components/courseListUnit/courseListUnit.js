// components/courseListUnit/courseListUnit.js
var app = getApp();

Component({
  properties: {
    tabContantList: {
      type: Array,
      data: []
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
      screenWidth: app.globalData.screenWidth,
      unitWidth: ((app.globalData.screenWidth -30)/2)-7.5
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
  methods: {
    taps: function(e){
      let index = this.data.tabContantList[e.currentTarget.dataset.index]
      let data = JSON.stringify(index)
      console.log(e)
  
      wx.navigateTo({
        url: '/pages/courseDetails/courseDetails?data='+data,
      })
    },
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

  }
})