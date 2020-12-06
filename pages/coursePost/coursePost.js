// pages/coursePost/coursePost.js
import Api from '../../utils/api'
import create from '../../utils/create'
import store from '../../store'

var app = getApp();

create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,//导航栏高度
    name: '',
    description: '',
    price: '',
    classTime: '',
    type: 0,
    typeName: '小学',
    areaId: '',
    areaName: '',
    phoneNumber: '',
    coverId: '',
    imageUrl: false,
    uploadFalse: false,
    typeActions:[
      {
        name: '小学',
        value: 0
      },
      {
        name: '初中',
        value: 1
      },
      {
        name: '高中',
        value: 2
      },
      {
        name: '大学',
        value: 3
      }
    ],
    showAction: false,
    fileUploadStart: false,
    posting: false // 提交状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.store.data.openId)
    this.setData({
      areaId: this.store.data.position.city.code,
      areaName: this.store.data.position.city.name,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onTypeActionSelect(event) {
    let value = event.detail
    
    this.setData({
      type: value.value,
      typeName: value.name
    })
  },
  openTypeAction: function(){
    console.log("开启")
    this.setData({ 'showAction': true });
  },
  onTypeActionClose() {
    this.setData({ 'showAction': false });
  },
  upload: function(){
    let that = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        that.setData({
          imageUrl: tempFilePaths,
          fileUploadStart: true
        })
        Api.uploadFile(tempFilePaths[0],
          function(res){
            if(res.code = 200){
              res = res.data
              var data = JSON.parse(res.data);
              console.log(data)
              that.setData({
                fileUploadStart: false,
                coverId: data.result,
                uploadFalse: false
              })
              console.log(that.data);
            }else{
              res = res.data
              console.log(res);
              wx.showToast({
                icon: 'none',
                title: '图片上传失败了',
              })
              that.setData({
                fileUploadStart: false,
                uploadFalse: true
              })
            }
          }
        )
      }
    })
  },
  radioChange: function(e){
    this.setData({
      type: e.detail
    })

  },
  /**
   * 发布课程
   */
  postCourse: function(){
    console.log(this.data)
    this.setData({
      posting: true
    })

    let data = this.data;
    let that = this

    let courseInfo = {
      name: data.name,
      description: data.description,
      price: data.price,
      classTime: data.classTime,
      type: data.type,
      coverId: data.coverId,
      areaId: data.areaId,
      phoneNumber: data.phoneNumber,
      openId: this.store.data.openId
    }

    console.log(courseInfo)
    Api.postCourse(courseInfo,function(e){
      console.log(e)
      that.setData({
        posting: false
      })
      wx.navigateTo({
        url: '/pages/order/order?type=1&status=0'
      })
    })
  },
  handleInputPrice(e) {
    console.log(e)
    let value = this.validateNumber(e.detail)
    this.setData({
      price: value
    })
  },
  validateNumber(val) {
      return val.replace(/\D/g, '')
    },
  handleInputCourseTime(e){
    let value = this.validateNumber(e.detail)
  this.setData({
    courseTime: value
  })
  }
  
})