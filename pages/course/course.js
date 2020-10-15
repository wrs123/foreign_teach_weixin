Page({
  data: {
    active: 1,
  },
  onLoad(event){
    this.changeNavType()
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
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
  }
});