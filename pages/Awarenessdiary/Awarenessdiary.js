// pages/Awarenessdiary/Awarenessdiary.js
Page({
  data: {
    focus: false, // 输入框焦点获取
    value: '', // 文本的内容
    cardface: '',
    cardback: ''
  },
  onLoad: function(options) {
    // 页面创建时执行
    this.setData({
      cardface:wx.getStorageSync('imgCar'),
      cardback:wx.getStorageSync('imgTextCar'),
      storyId:options.id,
      cardface: wx.getStorageSync('imgCar'),
      cardback: wx.getStorageSync('imgTextCar')
    })
    console.log(options.id)
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
  valueChange: function(e) { //同步更新value
    this.setData({
      value: e.detail.value
    })
  },
  toSaveContent: function() {
    let isEdit = '';
    let params = arguments[0]
    if (params && this.data.value) { // 未点击保存且没有填内容
      isEdit = 1
    } else if (params) { //已保存但是填写了内容
      isEdit = 0
    } else { // 点击保存 
      isEdit = 1
    }
    let StoryList = [];
    StoryList.push({
      imgTextCar: wx.getStorageSync('imgTextCar'),
      imgCar: wx.getStorageSync('imgCar'),
      storyValue: this.data.value
    })
    wx.request({
      url: 'http://129.204.154.119:5555/api/saveStory',
      data: {
        openid: wx.getStorageSync('openid'),
        storyInf: JSON.stringify(StoryList),
        createTime: +new Date,
        edit: isEdit
      },
      method: 'post',
      success: function(res) {
        if (res.data.code == 200) {
          if (params) {
            wx.showToast({
              title: '已保存请下次编辑！',
              icon: 'none',
              duration: 1000
            })
          } else {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000
            })
          }
          setTimeout(() => {
            wx.redirectTo({
              url: '../../pages/home/home',
            });
          }, 1200)
        }
      }
    })

  },
  showLoading(e) {
    let that = this //保存this
    wx.showModal({
      content: '是否保存改觉察日记', //提示的内容
      cancelTex: '不保存', //取消按钮的文字
      confirmText: '保存', //确认按钮的文字
      success: function(res) {
        if (res.confirm) {
          if (!that.data.value) {
            wx.showToast({
              title: '请输入觉察内容',
              icon: 'none',
              duration: 1000
            })
          } else {
            that.toSaveContent()
          }
        } else if (res.cancel) {
          that.toSaveContent('flag')
        }
      }
    });
    setTimeout(function() {
      wx.hideLoading();
    }, 2000);
  },
});