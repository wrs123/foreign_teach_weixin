// pages/order/order.js
import create from '../../utils/create'
import store from '../../store'
import Api from '../../utils/api'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

var app = getApp();

create(store,{

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    status: 1,
    statusTabs: ['全部','待确认','待完成','评论'],
    courseList: [],
    navBarHeight: app.globalData.navBarHeight,
    isLoad: true,
    orderDoing: false
  },
  onTbaChange: function(e){
    console.log(e)
    let index = e.detail.currentTarget.dataset.index

    this.setData({
      type: index
    })
     //获取订单列表
     this.loadOrderList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const type = options.type
    const status = options.status
    
    this.setData({
      type: type,
      status: status
    })
    console.log(options)
    //获取订单列表
    this.loadOrderList()
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
   * 加载订单列表
   * @param {*} type 
   */
  loadOrderList: function(){
    this.setData({
      isLoad: true
    })

    let type = this.data.type - 1
    let that = this
    let data = {
      openId: this.store.data.openId,
      type: this.data.status
    }

    if(type != -1){
      data.status = type
    }else{
      data.status = 999
    }

    Api.getOrderList(data,function(res){
      console.log(res)

      if(res.status == "success" && res.code == "200"){
        that.setData({
          isLoad: false,
          courseList: res.result.resultList
        })
      }
      
    })
  },
  /**
   * 拨打电话
   * @param {} e 
   */
  tel:function (e) {
    console.log(e)
    let number = e.target.dataset.phone
    
    if(typeof(number) != "undefined"){
      wx.makePhoneCall({
        phoneNumber: number.toString(),
      })
      return true;
    }

    console.log("拨打电话失败！")
  },
  /**
   * 订单操作
   * @param {*} e 
   */
  orderDo: function(e){
    console.log(e)
    let status = e.target.dataset.status
    let index = e.target.dataset.index
    let wacId = this.data.courseList[index].wacId

    if(this.data.status == 1 && status == "1"){
      this.tel(e)
    }
    let that = this
    this.setData({
      orderDoing: true
    })
    let data = {
      courseId: e.target.dataset.courseid,
      status: status,
      userOpenId: e.target.dataset.userid,
      id: wacId
    }
    console.log(data)
    Api.orderDo(data, res => {
      console.log(res)
      if(res.status == 'success' && res.code == 200){
        Notify({ type: 'success', message: '操作成功' });
        console.log(index)
        let courseList = this.data.courseList
        courseList.splice(index, 1)
        that.setData({
          orderDoing: false,
          courseList: courseList
        })
      }
    })
  },
  commentDo: function(e){
    let courseId = this.data.courseList[e.target.dataset.index].id
    let cover = this.data.courseList[e.target.dataset.index].cover
    let courceName  = this.data.courseList[e.target.dataset.index].name
    let courseType = this.data.courseList[e.target.dataset.index].courseType
    let wacId = this.data.courseList[e.target.dataset.index].wacId
    
    wx.navigateTo({
      url: '/pages/commentPost/index?courseId='+courseId+'&cover='+cover+'&name='+courceName+'&courseType='+courseType+'&wacId='+wacId
    })

  }
})