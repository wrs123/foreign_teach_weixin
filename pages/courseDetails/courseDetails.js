// pages/courseDetails/courseDetails.js
import create from '../../utils/create'
import store from '../../store'
import Api from '../../utils/api'

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
    titleWidth: app.globalData.screenWidth-(app.globalData.menuWidth+(app.globalData.menuRight*2)+app.globalData.menuHeight+15),
    navShadow: false,
    screenWidth: app.globalData.screenWidth,
    barColor: '#fff',
    barbackground: 'rgba(255,255,255,0)',
    barType: '',
    bannerHeight: app.globalData.screenWidth/16*11,
    tabs: ['简介', '评价'],
    tabTip: false,
    headTitleHeight: 0,
    tabBarTop: 0,
    courseId: '',
    learnCount: NaN,
    praiseRate: NaN,
    loadErr: false,
    isLoad: true,
    classTime: NaN,
    title: '-----',
    price: NaN,
    description: '--------',
    cover: '../../images/banner1.jpg',
    index: 0,
    hasComment: false,
    commentList: [],
    loadComment: false,
    loadCommentFalse: false,
    isReservation: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let data = options.data
    data = JSON.parse(data)
    console.log(data)
    this.changeNavType('dark')
    this.setData({
      courseId: data.id,
      classTime: data.class_time,
      title: data.name,
      price: data.price,
      description: data.description,
      cover: data.cover
    })
    //获取课程详情
    this.getCourse()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  //修改状态栏颜色
  changeNavType: function(type){
    let frontColor = '#ffffff'
    let backgroundColor = '#ffffff'

    if(type != this.data.barType){
      if(type == 'dark'){
        frontColor = '#000000'
        backgroundColor = '#000000'
      }
      wx.setNavigationBarColor({
          frontColor: frontColor,
          backgroundColor: backgroundColor,
          animation: {
            duration: 30,
            timingFunc: 'linear'
          }
      });
      this.setData({
        barType: type,
        barColor: type == 'light' ? '#fff' : '#333',
      })
    }
    
  },
  onTbaChange: function(e){
    console.log(e)
    let index = e.detail.currentTarget.dataset.index

    this.setData({
      index: index
    })
    if(!this.data.hasComment){
      this.getCommentList(true)
    }
  },
  //预约课程
  reservationCourse: function(e){
    if(!this.data.isReservation){
      this.setData({
        isReservation: true
      })
      let that = this
      let data = {
        openId: this.store.data.openId,
        courseId: this.data.courseId
      }
      console.log(data)
      Api.reservationCourse(data, res => {
        console.log(res)
        if(res.code == 200 && res.status == "success"){
          that.setData({
            isReservation: false,
          })
          wx.navigateTo({
            url: '/pages/order/order?type=1&status=1'
          })
          return true;
        }
          that.setData({
            isReservation: false,
          })
      })
    }
    
  },
  getCommentList: function(first){
    this.setData({
      loadComment: true
    })
    let data = {
      courseId: this.data.courseId
    }
    let that = this

    Api.getCommentList(data, function(res){
      console.log(res);
      if(res.code == 200 && res.status == "success"){
        if(first){
          that.setData({
            hasComment: true
          })
        }
        that.setData({
          commentList: res.result.resultList
        })
      }
    })
  },
  reurnPage: function(){
    wx.navigateBack()
  },
  onPageScroll: function(e){
    // console.log(e.scrollTop)
    if(e != null){
      let bannerHeight = this.data.bannerHeight
      let headHeight =  bannerHeight + this.data.headTitleHeight-this.data.navBarHeight+15
      let position = e.scrollTop;
      let offset = 1 / (bannerHeight-this.data.navBarHeight)
      let that = this

      wx.createSelectorQuery().select('#tabBar').boundingClientRect(function(rect){
        that.setData({
          tabBarHeight: rect.height
        })
      }).exec()
      
      if(position <= 30){
        this.changeNavType('light')
      }  
      else if(position > 30){
        this.changeNavType('dark')
        if(position >= headHeight && this.data.tabTip != true){
            this.setData({
              tabTip: true
            })
        }else if(position < headHeight && this.data.tabTip != false){
          this.setData({
            tabTip: false
          })
        }
      }  
      if(position <= bannerHeight-this.data.navBarHeight){
        this.setData({
          barbackground: 'rgba(255,255,255,'+position*offset+')'
        })
      }else{
        if(this.data.barbackground != 'rgba(255,255,255,1)'){
          this.setData({
            barbackground: 'rgba(255,255,255,1)'
          })
        } 
      }
    }
  },
  /**
   * 获取课程详情
   */
  getCourse: function(){
    this.setData({
      isLoad: true
    })
    let that = this

    let data = {
      courseId: this.data.courseId
    }
   Api.getCourseDetails(data, function(e){
     let res = e
     if(res.code == 200 && res.status == "success"){
       let datas = e.result

       that.setData({
        praiseRate: datas.praiseRate,
        learnCount: datas.learnCount,
        isLoad: false,
        isErr: false
       })
       that.changeNavType('light')
       that.getHeadTitleHeight()
     }else{
      that.setData({
        loadErr: true,
        isLoad: false
      })
      that.getHeadTitleHeight()
     }
   })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  getHeadTitleHeight: function(){
    let that = this
    wx.createSelectorQuery().select('#headTitle').boundingClientRect(function(rect){
      that.setData({
        headTitleHeight: rect.height
      })
    }).exec()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


})