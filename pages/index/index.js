//index.js
//获取应用实例
var app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    bannerImages:[  
      {url:'../../images/banner1.jpg'} ,  
      {url:'../../images/banner2.jpg'} ,  
      {url:'../../images/banner3.jpg'} 
      ],
      active: 0,
    courseTabs: ['小学', '初中', '高中', '大学'],
    tabsHeight: 30,
    courseList: ['', '','','',''],
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    menuBotton: app.globalData.menuBotton,//导航栏距离顶部距离
    menuHeight: app.globalData.menuHeight, //导航栏高度
    menuRight: app.globalData.menuRight,
    menuWidth: app.globalData.menuWidth,
    searchWidth: app.globalData.screenWidth-(app.globalData.menuWidth+(app.globalData.menuRight*2)+80+app.globalData.menuRight),
    navShadow: false,
    course_grp:[],
    moreCourses:{
      title:"已经到底，查看更多课程 >",
      url:"../course/course"
      },
    userInfo: {}
  },
  /*点击banner上的圆选择相应的图片 */
  bindStlBanner:function(e){
    console.log(e);
    var that = this;
    var bannerIdx = e.currentTarget.dataset.index;
      clearTimeout(that.data.banner.timeoutProcess);
      that.changeBanner(bannerIdx);
      that.data.banner.timeoutProcess = setInterval(that.timetochange,3000);
  },
  onLoad: function () {
    console.log('onLoad index')
    var that = this;
    var bannerArr = util.getBanner(),
        navArr = util.getNav(),
        adArr = util.getAd(),
        courseGrp = util.getCourse();
    that.setData({
        banner:{
          currindex:0,
          bannerimg:bannerArr
        },
        nav:navArr,
        ad:adArr,
        course_grp:courseGrp
      });
    that.changeBanner(0);
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    console.log(that.data);
  },
  onShow:function(){
    console.log("onshow index");
    var that = this;
    that.data.banner.timeoutProcess = setInterval(that.timetochange,3000);
    console.log(that.data);
  },
  onHide:function(){
    var that=this;

    clearTimeout(that.data.banner.timeoutProcess);
  },
  /**根据bannerArray的index显示 */
  changeBanner:function(index){
    var that = this,
        banner = that.data.banner,
        currindex = banner.currindex;

    banner.bannerimg[currindex].class ='';
    banner.bannerimg[index].class = 'active';
    banner.currindex = index;
    that.setData({
    "banner":banner
    });
    //showImg  todo
  },
  /*轮播banner */
  timetochange:function(){
    var that = this,
        banner = that.data.banner,
        currindex = banner.currindex;
        if(currindex < banner.bannerimg.length - 1)
        {
          currindex ++;
        }else{
          currindex = 0;
        }
        that.changeBanner(currindex);
  },
  onPageScroll: function(e){
    let position = e.scrollTop;
    if(position > 1){
      this.setData({
        navShadow: true
      });
    }else{
      console.log(this.data.navShadow)
      if(false != this.data.navShadow){
        this.setData({
          navShadow: false
        });
      }
    }
  }
})
