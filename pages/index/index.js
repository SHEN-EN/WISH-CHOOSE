//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.errMsg == "getUserInfo:ok"){//同意授权
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                wx.request({
                  url: 'http://10.3.13.32:5555/userInfo',
                  method: 'post',
                  data: {
                    openid: wx.getStorageSync('openid'),
                    userInfo: res.userInfo
                  },
                  success: result => {
                    //不用做任何操作测试用
                  }
                })
                wx.setStorage({
                  key: 'userInfo',
                  data: res.userInfo
                })
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
            this.setData({
              userInfo: e.detail.userInfo,
              hasUserInfo: true
            })
    }
  }
})
