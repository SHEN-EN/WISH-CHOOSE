// pages/history.js
var common = require('../../common/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      fullDay:[],//当月的天数
      year:'',//当前年份
      month:'',//当前月份
      nextMonth:[1,1,1,1,1,1,1,1,1,1,1,1], //随意值  只要length为12就完事
      index:0,//索引
      weekDay:['一','二','三','四','五','六','日']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date=new Date();
    this.setData({
      year:date.getFullYear(),
      month:date.getMonth() + 1
    })
    this.updataDay(this.data.year,this.data.month);
      wx.request({
        url: 'http://129.204.154.119:5555/api/storyList',
        data: {
          openid:wx.getStorageSync('openid'),
          pageNo:0
        },
        method: 'post', 
        success: function(res){
          // success
        }
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

  changeYear:function(e){ //切换日期
      this.setData({
        month:8
      })
      this.updataDay(this.data.year,this.data.month)
  },

  intervalChange:function(e){ //滑动修改日期
    if (e.detail.current - this.data.index == -1 || e.detail.current - this.data.index == 11) { //回到初始位置向左滑动
      this.setData({
        year:this.data.month<2?Number(this.data.year)-1:this.data.year,
        month:this.data.month<2?'12':Number(this.data.month)-1
       })
    } else if (e.detail.current - this.data.index == 1 || e.detail.current - this.data.index == -11) {//回到初始位置向右滑动
      this.setData({
        year:this.data.month>11?Number(this.data.year)+1:this.data.year,                                    
        month:this.data.month>11?'1':Number(this.data.month)+1
       })
    }
    this.setData({
      index: e.detail.current
    })
      this.updataDay(this.data.year,this.data.month)
  },

  updataDay:function(fullYear,month){
    this.setData({
      fullDay:[]
    })
    let getFullDay=common.getLastDay(fullYear,month)
    for (let i = 1; i <= getFullDay; i++) {
        this.data.fullDay.push(i);
    }
    let prevWeek=common.getFistWeek(this.data.year,this.data.month)==0?7:common.getFistWeek(this.data.year,this.data.month)
    for (let i = 1; i <prevWeek ; i++) {
        if (i==1) {
          this.data.fullDay.unshift(common.getLastDay(this.data.year,this.data.month,''))
        } else {
          this.data.fullDay.unshift(common.getLastDay(this.data.year,this.data.month,'')-i)
        }
    }
    let NextMonthDay=42-Number(this.data.fullDay.length)
    for (let i = 1; i <= NextMonthDay;i++) {
        this.data.fullDay.push(i);
    }
    this.setData({
      fullDay:this.data.fullDay
    })
  },
})