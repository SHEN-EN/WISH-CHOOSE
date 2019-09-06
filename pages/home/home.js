// pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/photo.png'
    }, {
        url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/photo.png',
    }, {
      url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/photo.png'
    }, {
      url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/photo.png'
    }],
    seriesList: [{
      name: '基础卡',
      url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/series-1.png'
    }, {
      name: '伴侣卡',
        url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/series-2.png'
    }, {
      name: '土著卡',
        url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/series-3.png'
    }, {
      name: '食物卡',
        url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/series-4.png'
    }, {
      name: '年轻人物卡',
        url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/series-5.png'
    }, {
      name: '天方夜谭卡',
        url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/series-6.png'
    }, {
      name: '克服卡',
        url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/series-7.png'
    }, {
      name: '天使卡',
        url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/series-8.png'
    }],
    hotPropList: [{
      type: 'image',
      url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/hotProp-1.png'
    }, {
      type: 'image',
        url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/hotProp-2.png'
    }, {
      type: 'image',
        url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/hotProp-3.png'
    }, {
      type: 'image',
        url: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/home/hotProp-4.png'
    }],
    home: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.login({ //去请求接口获取sesseionid
              success: res => {
                wx.request({
                  url: 'http://129.204.154.119:5555/api/getCode',
                  method: 'post',
                  data: {
                    code: res.code
                  },
                  success: json => {
                    wx.setStorageSync('openid', json.data.value.openid);
                    wx.getUserInfo({
                      success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        app.globalData.userInfo = res.userInfo;
                        wx.request({
                          url: 'http://129.204.154.119:5555/api/userInfo',
                          method: 'post',
                          data: {
                            openid: wx.getStorageSync('openid'),
                            userInfo: res.userInfo
                          },
                          success: result => {
                            wx.setStorage({
                              key: 'userInfo',
                              data: res.userInfo
                            });
                          }
                        });
                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (this.userInfoReadyCallback) {
                          this.userInfoReadyCallback(res);
                        }
                      }
                    });
                  }
                });
              }
            });
          } else { //未授权
            wx.redirectTo({ //重定向授权页
              url: '../../pages/author/author',
            });
          }
        }
      });
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    });
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.foot = this.selectComponent("#foot");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  selcet:function(){
    wx.redirectTo({
      url: '../../pages/pattern/pattern',
    });
  }
});