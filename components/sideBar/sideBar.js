// components/sideBar/sideBar.js
//获取应用实例
var app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemIndex: 0,
    itemBarTop: 0,
    itemHeight: 60,
    barHeight: 12,
    widgetWidth: app.globalData.screenWidth * 0.25,
    navBarHeight: app.globalData.navBarHeight,
    screenHeight: app.globalData.screenHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //计算itemBar高度
    getTop: function(d){
      let height = this.data.itemHeight
      
      return (d * height) - (height / 2) - 6 
    },
    //切换itemBar位置
    onItemTap: function(e){
      let index = e.currentTarget.dataset.index
      let id = e.currentTarget.dataset.id
      
      this.setData({
        itemBarTop: this.getTop(parseInt(index)+1),
        itemIndex: index
      })
      this.triggerEvent('onchange', {'id': id}, {})
    }
  },
  attached: function () {
    let itemIndex = this.data.itemIndex + 1;
    this.setData({
      itemBarTop: this.getTop(itemIndex)
    })
  }
})
