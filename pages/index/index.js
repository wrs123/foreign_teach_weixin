//index.js
import create from '../../utils/create'
import store from '../../store'
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');

//获取应用实例
var app = getApp();
var qqmapsdk = new QQMapWX({
  key: 'KSOBZ-RWCCS-O6TOX-6MIDA-WVV4O-4PBFZ' // 必填
});

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
    searchWidth: app.globalData.screenWidth-(app.globalData.menuWidth+(app.globalData.menuRight*2)+80+app.globalData.menuRight),
    navShadow: false,
    screenWidth: app.globalData.screenWidth
  },
  onLoad: function () {
    this.getLocation()
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
    wx.getLocation({
      type: 'gcj02',
      success: this.locationToCity
    })
  },
  //解析坐标为地址
  locationToCity(p){
    let that = this;
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
        that.store.data.position.city.name = result.city
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
  }
})
