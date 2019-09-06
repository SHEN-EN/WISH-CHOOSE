// pages/Awarenessdiary/Awarenessdiary.js
Page({
  data: {
    focus: false, // 输入框焦点获取
    value: '', // 文本的内容
    back: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/Awarenessdiary/back.png',
    cardface: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/result/cardface.png',
    cardback: 'https://shen-1259805780.cos.ap-chengdu.myqcloud.com/page_image/result/cardback.png'
  },
  showLoading() {
    wx.showLoading({
      title: '是否保存改觉察日记', //提示的内容
      mask: true, //是否显示透明蒙层，防止触摸穿透
      success: function() {
        wx.redirectTo({
          url: '../../pages/home/home',
        });
      }, //接口调用成功的回调函数
      fail: function() {
        wx.redirectTo({
          url: '../../pages/home/home',
        });
      }, //接口调用失败的回调函数
    });
    setTimeout(function() {
      wx.hideLoading();
    }, 2000);
  },
  onLoad: function(options) {
    // 页面创建时执行
    wx.request({
      url: 'http://129.204.154.119:5555/api/saveStory',
      data: {},
      method: 'post', 
      success: function(res){
          console.log(res)
      }
    })
  },
  onShow: function() {
    // 页面出现在前台时执行
  },
  onReady: function() {
    // 页面首次渲染完毕时执行
  },
  onHide: function() {
    // 页面从前台变为后台时执行
  },
  onUnload: function() {
    // 页面销毁时执行
  },
  onPullDownRefresh: function() {
    // 触发下拉刷新时执行
  },
  onReachBottom: function() {
    // 页面触底时执行
  },
  onShareAppMessage: function() {
    // 页面被用户分享时执行
  },
  onPageScroll: function() {
    // 页面滚动时执行
  },
  onResize: function() {
    // 页面尺寸变化时执行
  },
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index);
    console.log(item.pagePath);
    console.log(item.text);
  },
  // 事件响应函数
  viewTap: function() {
    this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
    });
  },
  // 自由数据
  customData: {
    hi: 'MINA'
  }
});