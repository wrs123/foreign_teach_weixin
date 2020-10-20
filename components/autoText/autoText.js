// components/autoText/autoText.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: Number,
      value: 0,
    },
    fontWeight: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: 0,
      observer: function(newVal, oldVal) {
        // 属性值变化时执行
        this.setFontSize(newVal)
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    fontSize: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setFontSize: function(text){
      let l = text.length
      
      let fontSize = 0;

      fontSize = this.properties.width / l > 35 ? 35:this.properties.width/l
      this.setData({
        fontSize:   fontSize 
      })
    }
  }
})
