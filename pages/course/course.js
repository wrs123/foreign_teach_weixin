import create from '../../utils/create'
import store from '../../store'

//获取应用实例
var app = getApp();
import Api from '../../utils/api'
create(store,{
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
    loadType: true,
    courseList: ['', '','','','','','','','',''],
    screenWidth: app.globalData.screenWidth,
    contentWidth: app.globalData.screenWidth * 0.75,
    imageWidth: app.globalData.screenWidth * 0.75 * .35,
    imageHeight: (app.globalData.screenWidth * 0.75 * .35/16)*11,
    isLoading: true,
    scrollTop: 0,
    modelZIndex: 1,
    typeId: 0
  },
  onLoad(event){
    this.changeNavType()
    let that = this
    // setTimeout(function(){
    //   that.setData({
    //     isLoading: false
    //   })
    //   setTimeout(function(){
    //     that.setData({
    //       modelZIndex: -1
    //     })
    //   },300)
    // },2000),
    //获取课程列表
    this.loadCourseList();
    

    
  },
  loadCourseList(){
    let that = this;
    let type = this.data.typeId
    //开始加载
    this.showLoad()

    console.log("start load===type:"+type)
    //  网络请求
    Api.getCourseList(type, 
      function(e){
        console.log(e)
        if(e.statusCode == 200){
          that.setData({
            courseList: e.data.resultList
          })
          //结束加载
         that.hideLoad(true)
        }else{
          //结束加载
          that.hideLoad(false)
          wx.showToast({
            title: e.message,
            icon: 'none',
          });
        }
      });
  },
  hideLoad: function(loadType){
    let that = this

    this.setData({
      isLoading: false,
    })
    setTimeout(function(){
      that.setData({
        modelZIndex: -1,
        loadType: loadType
      })
    },300)
  },
  showLoad: function(){
    this.setData({
      isLoading: true,
      modelZIndex: 1
    })
  },
  onTabChange: function(e){
    console.log(e);
    let id = e.detail.id
    this.setData({
      typeId: id
    })
    let that = this

    this.loadCourseList()

    // this.showLoad()
    // setTimeout(function(){
    //   that.setData({
    //     isLoading: false,
    //     scrollTop: 0
    //   })
    //   setTimeout(function(){
    //     that.setData({
    //       modelZIndex: -1
    //     })
    //   },300)
    // },2000)

    
    
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
  jumpToDetailsPage: function(e){
    let data = e.currentTarget.dataset.data
    data = JSON.stringify(data)

    wx.navigateTo({
      url: '../courseDetails/courseDetails?data='+data
    })
  }
})