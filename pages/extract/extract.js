// pages/extract/extract.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardsImg: [
      '../image/Cards.png',
      '../image/Cards.png',
      '../image/Cards.png',
      '../image/Cards.png',
      '../image/Cards.png',
      '../image/Cards.png',
      '../image/Cards.png',
      '../image/Cards.png',
      '../image/Cards.png',
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  start: function() {
    let animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease-in-out',
    })
    animation.opacity(.8).translate(-350,0).step()
    this.setData({
      cardsAnimation: animation.export()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.start()
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
  goNext:function () { 
    wx.redirectTo({
      url: '../../pages/cards/cards',
    })
   }
})