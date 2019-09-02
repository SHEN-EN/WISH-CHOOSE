//author.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.errMsg == "getUserInfo:ok") { //同意授权
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          wx.request({
            url: 'http://129.204.154.119:5555/userInfo',
            method: 'post',
            data: {
              openid: wx.getStorageSync('openid'),
              userInfo: res.userInfo
            },
            success: result => {
              console.log(result)
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo
              });
              this.setData({
                loadModal: true
              })
              setTimeout(() => {
                this.setData({
                  loadModal: false
                })
              }, 2000)
              if(result.data.code==200){
                this.setData({
                  userInfo: e.detail.userInfo,
                });
                wx.redirectTo({
                  url: '../home/home',
                })
              } else if (result.data.code==400){
                wx.redirectTo({
                  url: '../home/home',
                })
              }
            }
          })
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        }
      })
    }
  }
})