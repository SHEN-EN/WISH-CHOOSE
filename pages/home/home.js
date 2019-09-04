// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: '../image/photo.png'
    }, {
      id: 1,
      type: 'image',
      url: '../image/photo.png',
    }, {
      id: 2,
      type: 'image',
      url: '../image/photo.png'
    }, {
      id: 3,
      type: 'image',
      url: '../image/photo.png'
    }],
    seriesList: [{
      name: '基础卡',
      url: '../image/home/series-1.png'
    }, {
      name: '伴侣卡',
      url: '../image/home/series-2.png'
    }, {
      name: '土著卡',
      url: '../image/home/series-3.png'
    }, {
      name: '食物卡',
      url: '../image/home/series-4.png'
    }, {
      name: '年轻人物卡',
      url: '../image/home/series-5.png'
    }, {
      name: '天方夜谭卡',
      url: '../image/home/series-6.png'
    }, {
      name: '克服卡',
      url: '../image/home/series-7.png'
    }, {
      name: '天使卡',
      url: '../image/home/series-8.png'
    }],
    hotPropList: [{
      type: 'image',
      url: '../image/home/hotProp-1.png'
    }, {
      type: 'image',
      url: '../image/home/hotProp-2.png'
    }, {
      type: 'image',
      url: '../image/home/hotProp-3.png'
    }, {
      type: 'image',
      url: '../image/home/hotProp-4.png'
    }],
    home: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.request({
        url: 'http://129.204.154.119:5555/get',
        method: 'get',
        data: {
          
        },
        success: json => {
          
        }
      })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
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
    })
  }
})