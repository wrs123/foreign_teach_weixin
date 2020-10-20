// pages/positionSelect/positionSelect.js
import create from '../../utils/create'
import store from '../../store'
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');

var app = getApp()

create(store, {
  data: {
    searchLetter: [],
    showLetter: "",
    winHeight: 0,
    cityList: [],
    isShowLetter: false,
    scrollTop: 0,//置顶高度
    scrollTopId: '',//置顶id
    city: "",
    cityList_search:[],
    address_show:false,
    search_city:[],
    is_data:true,
    empty:'',
    addressLoading: true,
    navBarHeight: app.globalData.navBarHeight,
    screenHeight: app.globalData.screenHeight,
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
    },
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.loadCity(options) //加载城市列表
    console.log(options)

  },
  /**
   * 加载城市列表
   */
  loadCity: function(options){
    //开始加载城市
    console.log("======城市加载开始======")
    this.setData({
      addressLoading: true
    })
    let that = this;
    that.setData({
      city: options.cityName
    })
    var searchLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z"];
    new Promise(function (resolve) {
      that.getCity(function (data) {
       
        let cityObj = data.cityList;
        var tempObj = [];
        for (var i = 0; i < searchLetter.length; i++) {
          var initial = searchLetter[i];
          var cityInfo = [];
          var tempArr = {};
          tempArr.initial = initial;
       
          for (var j = 0; j < cityObj.length; j++) {
          
            if (initial == cityObj[j].pinyin[0][0].toUpperCase()) {
              cityInfo.push({
                area_code: cityObj[j].id,
                area_name: cityObj[j].name
              });
            }
          }
          tempArr.cityInfo = cityInfo;
          tempObj.push(tempArr);
        }
        that.setData({
          cityList: tempObj
        })
        resolve(tempObj); 
      })
      
    }).then(function(res){
      let cityObj = [];
      var sysInfo = wx.getSystemInfoSync();
      var winHeight = sysInfo.windowHeight;
      var itemH = winHeight / searchLetter.length;
      var tempObj = [];
      for (var i = 0; i < searchLetter.length; i++) {
        var temp = {};
        temp.name = searchLetter[i];
        temp.tHeight = i * itemH;
        temp.bHeight = (i + 1) * itemH;
        tempObj.push(temp)
      }
      that.setData({
        winHeight: winHeight,
        itemH: itemH,
        searchLetter: tempObj,
        addressLoading: false //城市加载完成
      })   
      console.log("======城市加载结束======")
    })
  },
  getCity: function (callBack){
    let that = this;
    
    var qqmapsdk = new QQMapWX({
      key: this.store.data.mapKey // 必填
    });

    qqmapsdk.getCityList({
      sig: this.store.data.mapKey,
      success: function(data){
        if(data.status == 0){
          that.setData({
            cityList: data.result[1],
            // city: data.datainfo.getcode,         
          })
          callBack({
            cityList: data.result[1]
          })
        }else {
          callBack({
            cityList: data.result[1]
          })
        }
      }
    })
  //   app.commonRequest('wxapp/public/getCityList', 'POST', {}, function (data) {
  //       console.log(data);
  //         if (data.status == '200') {
  //           that.setData({
  //             cityList: data.datainfo.list,
  //             // city: data.datainfo.getcode,         
  //           })
  //           callBack({
  //             cityList: data.datainfo.list
  //           })
  //         } else {
  //           callBack({
  //             cityList: data.datainfo.list
  //           })
  //         }
  //   })
  // },
  // set_current_city:function(set_city,callBack){
  //   let that = this;
  //   app.commonRequest('wxapp/public/getCityList', 'POST', {
  //     area_name: set_city,
  //     cityCheckType:1,
  //   }, function (data) {
  //     console.log(data)
  //     if (data.status == "200") {
  //       callBack({
  //         data: data
  //       })
  //     }else {
  //       callBack({
  //         data: data
  //       })
  //     }
  //   })    
  },
  search_city:function(e){
    let that =this;
    that.setData({
      address_show:true
    })

  },
  cancel_city:function(e){
    let that = this;
    that.setData({
      search_city:[],
      address_show: false,
      empty:'',
    })
  },
  seacrch_city:function(e){
    let that =this;
    let search_val = e.detail.value;
    console.log(search_val);
    app.commonRequest('wxapp/public/getCityList', 'POST', {
      area_name: search_val
    }, function (data) {
      console.log(data)
      if(data.status == "200"){
        if (data.datainfo.list.length >0){
          that.setData({
            search_city: data.datainfo.list,
            is_data: true
          })
        }
        else{
          that.setData({
            search_city: data.datainfo.list,
            is_data:false
          })
        }
      }      
    })    
    
  },
  clickLetter: function (e) {
    console.log(e.currentTarget.dataset.letter)
    var showLetter = e.currentTarget.dataset.letter;
    this.setData({
      showLetter: showLetter,
      isShowLetter: true,
      scrollTopId: showLetter,
    })
    var that = this;
    setTimeout(function () {
      that.setData({
        isShowLetter: false
      })
    }, 1000)
  },
  //选择城市
  bindCity: function (e) {
    wx.setStorageSync('currentcity', e.currentTarget.dataset.city)

    this.store.data.position.city.name = e.currentTarget.dataset.city
    this.update()
　　// 回到首页
    wx.switchTab({
      url: '/pages/index/index' 
    })
  },
})
