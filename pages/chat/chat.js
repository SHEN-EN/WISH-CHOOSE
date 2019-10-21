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
      this.data.value.push(this.data.inputValue)
      this.setData({
        value:this.data.value,
      })
      this.sendSocketMessage(this.data.value)
  },
  sendSocketMessage:function(msg){
      wx.sendSocketMessage({
        data:msg
      })
  },
  onLoad:function(){
    var userInfo = wx.getStorageSync('userInfo');
    this.setData({
      headerImg: userInfo.avatarUrl,
    })
    var url = "ws://10.3.13.32:8003"
    wx.connectSocket({
      url:url
    })
     
    wx.onSocketOpen(()=>{
      wx.showToast({
        title: '链接成功',
      })
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
      console.log("收到消息:"+res.data)
    })
  }
})