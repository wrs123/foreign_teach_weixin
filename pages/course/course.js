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
    imageHeight: (app.globalData.screenWidth * 0.75 * .35/16)*11
  },
  onLoad(event){
    this.changeNavType()
  },
  onTabChange: function(e){
    console.log(e);
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

  }
});