function getsession() {
  wx.login({ //去请求接口获取sesseionid
    success: res => {
      wx.request({
        url: 'http://10.3.13.32:5555/getCode',
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

function UserInfo() {
  // 获取用户信息
  wx.getSetting({
    success: res => {
      console.log(res)
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo
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
      }
    }
  })
}
module.exports={
  getsession,
  UserInfo
}