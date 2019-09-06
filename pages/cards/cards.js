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
      url: 'http://129.204.154.119:5555/api/getPhoto',
      method: 'post',
      data: {},
      success: json => {
        let imgList=[];
        json.data.result.forEach((item,index) => {    
          imgList.push({ id:index,image: item.image, sideImg:'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/cards/Cards-1.png',click:''}) //sideIMG背面src image隐藏src
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
    for (let i = 0; i < this.data.cardsImg.length; i++) {
        this.data.cardsImg[i].click='';
        this.setData({
          cardsImg:this.data.cardsImg
        })
    }
    this.data.cardsImg[e.target.dataset.id].click='select';
    this.setData({
      cardsImg:this.data.cardsImg
    })
    wx.setStorage({
      key: 'imgCar',
      data: e.target.dataset.src,
    })
  },
  selcetResult: function () {
    let selectFlag=this.data.cardsImg.some(item =>{
        return item.click=='select'
    })
    if (selectFlag) {
      wx.redirectTo({
        url: '../../pages/result/result',
      })
    }else{
      wx.showToast({
        title: '请抽取卡牌',
        icon: 'none',
        duration: 1000
      })
    }
  }
})