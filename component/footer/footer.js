// pages/component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: { //接收父组件值
    state: {
      type: Boolean,

    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    home: true,
    my:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    home:function(){
      wx.redirectTo({
        url: '../../pages/home/home',
      })
    },
    my: function () {
      wx.redirectTo({
        url: '../../pages/my/my',
      })
    }
  },
  ready: function () {
    this.setData({
      home: this.data.state,
      my:!this.data.state
    })
  },
})