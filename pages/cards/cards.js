Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardsImg:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  start: function() {
    let animation = wx.createAnimation({
      duration: 2000,
      timingFunction: 'ease-in-out',
    })
    animation.opacity(1).translate(0,0).step()
    this.setData({
      cardsAnimation: animation.export()
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.request({
      url: 'http://129.204.154.119:5555/getPhoto',
      method: 'post',
      data: {},
      success: json => {
        let imgList=[];
        json.data.result.forEach(item => {    
          imgList.push({image:item.image,sideImg:'../image/Cards-1.png'})
          this.setData({
            cardsImg:imgList
          })
          this.start()    
        });
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  selectCar:function(e){
    console.log(e)
    wx.setStorage({
      key: 'imgCar',
      data: e.target.dataset.src,
    })
  },
  selcetResult: function () {
    wx.redirectTo({
      url: '../../pages/result/result',
    })
  }
})