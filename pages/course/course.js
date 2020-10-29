//获取应用实例
var app = getApp();

Page({
  data: {
    active: 1,
    navBarHeight: app.globalData.navBarHeight,
    courseDate: [
      {
        name: '小学教育',
        id: 0
      },
      {
        name: '初学教育',
        id: 1
      },
      {
        name: '高中教育',
        id: 2
      },
      {
        name: "大学教育",
        id: 3
      }
    ],
    courseList: ['', '','','','','','','','',''],
    screenWidth: app.globalData.screenWidth,
    contentWidth: app.globalData.screenWidth * 0.75,
    imageWidth: app.globalData.screenWidth * 0.75 * .35,
    imageHeight: (app.globalData.screenWidth * 0.75 * .35/16)*11,
    isLoading: true,
    scrollTop: 0,
    modelZIndex: 1
  },
  onLoad(event){
    this.changeNavType()
    let that = this
    setTimeout(function(){
      that.setData({
        isLoading: false
      })
      setTimeout(function(){
        that.setData({
          modelZIndex: -1
        })
      },300)
    },2000)
    
    
  },
  onTabChange: function(e){
    console.log(e);
    let id = e.detail.id
    let that = this

    this.setData({
      isLoading: true,
      modelZIndex: 1
    })
    setTimeout(function(){
      that.setData({
        isLoading: false,
        scrollTop: 0
      })
      setTimeout(function(){
        that.setData({
          modelZIndex: -1
        })
      },300)
    },2000)
    
  },
  changeNavType: function(){
    wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ccc',
        animation: {
          duration: 30,
          timingFunc: 'linear'
        }
    });
  },
  loadCourseList: function(id){

  },
  jumpToDetailsPage: function(e){
    let courseId = e.currentTarget.dataset.courseid

    wx.navigateTo({
      url: '../courseDetails/courseDetails?course='+courseId
    })
  }
});