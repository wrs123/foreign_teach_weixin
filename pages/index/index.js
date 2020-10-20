//index.js
import create from '../../utils/create'
import store from '../../store'
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');

//获取应用实例
var app = getApp();

create(store, {
  data: {
    position: {
      'city': {
        'code': 999,
        'name': '--'
      },
      'province': {
        'name': '--',
        'code': 999
      },
      'district': {
        'code': 999,
        'name': '--'
      }
    }, //当前所在位置
    bannerImages:[  
      {url:'../../images/banner1.jpg'} ,  
      {url:'../../images/banner2.jpg'} ,  
      {url:'../../images/banner3.jpg'} 
      ],
    active: 0,
    courseTabs: ['小学', '初中', '高中', '大学'],
    courseTabList: [0, 1, 2, 3],
    tabsHeight: 30,
    activeTabIndex: 0,
    courseList: ['', '','','',''],
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    menuBotton: app.globalData.menuBotton,//导航栏距离顶部距离
    menuHeight: app.globalData.menuHeight, //导航栏高度
    menuRight: app.globalData.menuRight,
    menuWidth: app.globalData.menuWidth,
    searchWidth: app.globalData.screenWidth-(app.globalData.menuWidth+(app.globalData.menuRight*2)+100+app.globalData.menuRight),
    navShadow: false,
    screenWidth: app.globalData.screenWidth
  },
  onLoad: function () {
    //获取当前位置P
    this.getLocation()
    //判断滚动
    this.onPageScroll()
  },
  onShow: function(){
    console.log("主页显示："+this.store.data.position.city.name);
    wx.showToast({
      title: "主页显示:"+this.store.data.position.city.name,
      icon: 'none',
    });
    this.loadCourseList()
  },
  //加载课程列表
  loadCourseList: function(){
    
  },
  //切换tab 
  onTbaChange(e) {
   this.setData({
    activeTabIndex: e.detail.currentTarget.dataset.index
   })
   console.log("activeTabIndex"+ this.data.activeTabIndex)
  },
  //获取当前所在位置
  getLocation(){
    let pos = this.store.data.position.district.name
  
    if('--' == pos){
      console.log('开始获取地理位置')
      wx.getLocation({
        type: 'gcj02',
        success: this.locationToCity
      })
    }
  },
  //解析坐标为地址
  locationToCity(p){
    let that = this;
    var qqmapsdk = new QQMapWX({
      key: this.store.data.mapKey // 必填
    });

    qqmapsdk.reverseGeocoder({
      location: {
        latitude: p.latitude,
        longitude: p.longitude
      },
      success: function(location) {
        //返回真实地理位置
        console.log(location)
        //更新位置数据
        let result = location.result.ad_info
        that.store.data.position.province.name = result.province
        that.store.data.position.province.code = '000'
        that.store.data.position.city.name = result.city.substring(0, result.city.length - 1)
        that.store.data.position.city.code = result.city_code
        that.store.data.position.district.name = result.district
        that.store.data.position.district.code = result.adcode
        that.update()
      },
      fail: function(error) {
        wx.showToast({
          title: `兄，你这定位失败了啊`,
          icon: 'none',
        });
      }
  })
  },
  onPageScroll: function(e){
    if(e != null){
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
  },
  //跳转到位置选择页面  
  positionChoosePage: function(e){
  
    wx.navigateTo({
      url: '../positionSelect/positionSelect?cityName='+this.data.position.city.name+'&cityCode='+this.data.position.city.code
    })
  },
  jumpToSearchPage: function(){
    wx.navigateTo({
      url: '../searchPage/index'
    })
  }
})
