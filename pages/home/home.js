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
	home: true,
	title:{
		"bg_color": "#ffea2e",
    "color": "#333",
		"name": "Wise Choose"
	}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.checkSession({
      success (e) {
        //session_key 未过期，并且在本生命周期一直有效
        if(!wx.getStorageSync('session_key')){
          wx.redirectTo({ //重定向授权页
            url: '../../pages/author/author',
          });
        }
      },
      fail (e) {
        wx.redirectTo({ //重定向授权页
          url: '../../pages/author/author',
        });
      }
    })
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
  onShareAppMessage: function(e) {
    return {
      title: '首页', //转发的标题。当前小程序名称
      path: `pages/home/home`, //转发的路径
      imageUrl: '',//自定义图片路径 支持PNG及JPG。显示图片长宽比是 5:4。
  }
  },
  selcet:function(){
    wx.redirectTo({
      url: '../../pages/pattern/pattern',
    });
  }
});