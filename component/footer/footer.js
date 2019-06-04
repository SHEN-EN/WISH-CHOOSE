// pages/component.js
Component({
  /**
   * 组件的属性列表
   */
  properties: { //接收父组件值

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
    // changePage:function(){
    //   if (this.data.clickFlag) {
    //     this.setData({
    //       clickFlag:false
    //     })
    //   }else{
    //     this.setData({
    //       clickFlag:true
    //     })
    //   }
    // }
    home:function(){
      this.setData({
        home:true,
        my:false
      })
    },
    my: function () {
      this.setData({
        home: false,
        my: true
      })
    }
  },

})