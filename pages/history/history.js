// pages/history.js
  
var common = require('../../common/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      fullDay:[],//当月的天数要显示的天数
      year:'',//当前年份
      month:'',//当前月份
      nextMonth:[1,1,1,1,1,1,1,1,1,1,1,1], //随意值  只要length为12就完事
      index:0,//索引
      weekDay:['一','二','三','四','五','六','日'],
      title: {
      "bg_color": "#fff",
      "color": "#000",
      "flag": 1,
      "name": "我的觉察"
      },
      pageNo:0,
      historyList:[],
      class:'',//显示日历样式
      selectId:'',//选中的id 天
      toDelete:false, //默认不显示删除
      deleteList:[],
      prevWeek:'', //上个月的天数
      nextWeek:'', //下一个月的天数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadingList()
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
  onReachBottom: function (e) {
    this.setData({
      pageNo:this.data.pageNo+5
    })
    this.loadingList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
     
  },

  changeYear:function(e){ //切换日期
    if (e.currentTarget.dataset.direction=='left') {
        this.setData({
          year:this.data.month<2?Number(this.data.year)-1:this.data.year,
          month:this.data.month<2?'12':Number(this.data.month)-1
       })
    }else{
      this.setData({  
          year:this.data.month>11?Number(this.data.year)+1:this.data.year,
          month:this.data.month>11?'1':Number(this.data.month)+1
       })
    }
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

  /**
   * 更改日期
   * @param {年份} fullYear 
   * @param {月份} month 
   */

  updataDay:function(fullYear,month){
    let onthisDay=[]//当月的天数
    this.setData({
      fullDay:[]
    })

    let getFullDay=common.getLastDay(fullYear,month)
    for (let i = 1; i <= getFullDay; i++) {
        this.data.fullDay.push(i);
        onthisDay.push(i)
    }
    
    this.setData({
      prevWeek:common.getLastWeek(this.data.year,this.data.month) 
    })
    let prev=this.data.prevWeek=='1'?'2':this.data.prevWeek
    for (let j = 1; j < prev; j++) {
        onthisDay.unshift('')
        if (j==1) {
          if (prev=='2') {
            this.data.fullDay.unshift(common.getLastDay(this.data.year,this.data.month,''))  //插入本身
          }else{
            onthisDay.unshift('')
            this.data.fullDay.unshift(common.getLastDay(this.data.year,this.data.month,''))  //插入本身
            this.data.fullDay.unshift(common.getLastDay(this.data.year,this.data.month,'')-j) //插入本身-1的天数
          }
        } else {
          this.data.fullDay.unshift(common.getLastDay(this.data.year,this.data.month,'')-j)
        }
    }
    let NextMonthDay=42-Number(this.data.fullDay.length)
    this.setData({
        nextWeek:NextMonthDay
    })
    for (let i = 1; i <= NextMonthDay;i++) {
        onthisDay.push('')
        this.data.fullDay.push(i);
    }
    if (arguments[2]) { //选择的 日期
      var argFirst=arguments[2].split('-')[1]
      this.setData({
        fullDay:this.data.fullDay,
        selectId:onthisDay.indexOf(Number(argFirst))+'-'+String(argFirst)
      })
      console.log(this.data.selectId)
    }else{
      this.setData({
        fullDay:this.data.fullDay,
      })
    }
  },
  loadingList:function(){ //加载list
    let that=this
    wx.request({
      url: 'http://129.204.154.119:5555/api/storyList',
      data: {
        openid:wx.getStorageSync('openid'),
        pageNo:this.data.pageNo,
        edit:arguments[0]==undefined?'':arguments[0],
        startTime:arguments[1]==undefined?'':arguments[1],
        endtTime:arguments[2]==undefined?'':arguments[2],
      },
      method: 'post', 
      success: function(res){
        let arr=[...res.data.query];
        arr.push(...that.data.historyList)
        that.setData({
          historyList:arr
        })
      }
    })
  },
  toSelectTime:function(){ //显示日期控件 并且初始化
    let date=new Date();
    this.setData({
      year:date.getFullYear(),
      month:date.getMonth() + 1,
      selectId:(date.getDate()+common.getLastWeek(date.getFullYear(),date.getMonth()+1)-1)+'-'+date.getDate()
    })
    this.updataDay(this.data.year,this.data.month);
      this.setData({
        class:'block'
      })
  },
  toDisplay:function(){ //取消选择
    this.setData({
      class:'',
      year:'',
      month:'',
      selectId:''
    })
  },
  toshow:function(){  //选择日期完成
    this.setData({
      class:''
    });
    this.loadingList('',+new Date(`${this.data.year}-${this.data.month}-${this.data.selectId.split('-')[1]}`),+new Date(`${this.data.year}-${this.data.month}-${Number(this.data.selectId.split('-')[1])+1}`)-1)
  },
  selectDay:function(e){ //选择日期天数
    let spiltDay=String(e.currentTarget.dataset.day).split('-');
    let Month='';
    if (Number(spiltDay[0])<this.data.prevWeek) { //上个月
       Month=this.data.month-1;
       this.setData({
        selectId:e.currentTarget.dataset.day,
        month:Month
      })
      this.updataDay(this.data.year,this.data.month,e.currentTarget.dataset.day)
    }else if ((this.data.fullDay.length-this.data.nextWeek)<=Number(spiltDay[0])) { //下个月
        Month=this.data.month+1;
        this.setData({
          selectId:e.currentTarget.dataset.day,
          month:Month
        })
        this.updataDay(this.data.year,this.data.month,e.currentTarget.dataset.day)
    }else{
      Month=this.data.month;
      this.setData({
        selectId:e.currentTarget.dataset.day,
        month:Month
      })
    }
  },
  eventAgent(e){ //事件代理
    switch (e.target.dataset.event) {
      case 'time':
          this.setData({
            historyList:''
          })
          this.toSelectTime();
        break;
      case 'isEdit':
        this.setData({
          historyList:''
        })
          this.loadingList(1) //edit :1 已察觉
        break;
      case 'noEdit':
          this.setData({
            historyList:''
          })
          this.loadingList(0)          
        break;
      case 'delete':
        this.setData({
          toDelete:this.data.toDelete?false:true
        })
        break;
      default:
        break;
    }
  },
  checkboxChange:function(e){ //获取要删除的Id
      this.data.deleteList.push(e.detail.value[0])
      this.setData({
        deleteList:[...this.data.deleteList]
      })
  },
  deleteById:function () {
    if (this.data.deleteList) {
      wx.showToast({
        title: '请选择要删除的项目',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.request({
        url: 'http://129.204.154.119:5555/api/deleteListById',
        data: {
          id:this.data.deleteList
        },
        method: 'post', 
        success: function(res){
          if (res.data.code==200) {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1000
            })
          }else{
            wx.showToast({
              title: '删除失败请重试',
              icon: 'none',
              duration: 1000
            })
          }
        },
      })
    }
  },
  toDetail:function (e) {
      console.log(e)
  }
})