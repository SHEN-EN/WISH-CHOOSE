var common = require('../../common/common.js')
Page({
  data: {
    InputBottom: 0,
    title: {
      "bg_color": "#ffea2e",
      "color": "#333",
      "name": "咨询",
      "flag": 1,
    },
    headImg:'',
    value:[], //发送者的消息列表
    inputValue:'',//输入框的值
    commitValue:[],
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  changInput(e){
    this.setData({
      inputValue:e.detail.value
    })
  },
  send:function () {
      let input='';
      input=this.data.inputValue
      this.data.value.push(this.data.inputValue)
      this.setData({
        value:this.data.value,
      })
      this.sendSocketMessage(JSON.stringify({
        uuid:wx.getStorageSync('uuid'),
        message:input,
        type:2,
        img:wx.getStorageSync('userInfo').avatarUrl,
      }))
  },
  sendSocketMessage:function(msg){
      wx.sendSocketMessage({
        data:msg
      })
  },
  onLoad:function(){
    wx.setStorage({
      key: 'uuid',
      data: common.wxuuid(),
    })
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      headerImg: userInfo.avatarUrl,
    })
    var url = "ws://129.204.154.119:8003"
    wx.connectSocket({
      url:url
    })
     
    wx.onSocketOpen(()=>{
      wx.showToast({
        title: '链接成功',
      })
      this.sendSocketMessage(JSON.stringify({
        uuid:wx.getStorageSync('uuid'),
        message:'',
        type:1
      }))
    })
    wx.onSocketError(()=>{
      wx.showToast({
        title: '链接失败',
      })

    })
    wx.onSocketClose(()=>{
      wx.showToast({
        title: '关闭了',
      })
    })  
    wx.onSocketMessage((res)=>{
      if (JSON.parse(res.data).uuid!=wx.getStorageSync('uuid')) {
          this.data.commitValue.push(JSON.parse(res.data))
          this.setData({
            commitValue:this.data.commitValue
          });
      }
    })
  }
})