// pages/order/order.js
import create from '../../utils/create'
import store from '../../store'
import Api from '../../utils/api'

var app = getApp();

create(store,{

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    status: 1,
    statusTabs: ['全部','待确认','待完成','已完成'],
    courseList: [],
    navBarHeight: app.globalData.navBarHeight,
    isLoad: true,
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
      status: this.data.status
    }

    if(type != -1){
      data.type = type
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
  }
})