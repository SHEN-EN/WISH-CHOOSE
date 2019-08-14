//app.js
App({
  onLaunch: function() {
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
        wx.redirectTo({//
          url: '../../pages/home/home',
        })
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
         //重新登录
        wx.login({ //去请求接口获取sesseionid
          success: res => {
            wx.request({
              url: 'http://139.155.146.164:5555/getCode',
              method: 'post',
              data: {
                code: res.code
              },
              success: json => {
                wx.setStorage({
                  key: 'openid',
                  data: json.data.value.openid,
                })
              }
            })
          }
        })
      }
    }),
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }else{//未授权
            wx.redirectTo({//重定向授权页
              url: '../../pages/author/author',
            })
          }
        }
      })
  },
  globalData: {
    userInfo: null
  }
})