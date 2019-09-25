
Component({
    properties: {
      myProperty: {
        type: Object,
        value: {
          "bg_color": "white",
          "color": "#000",
          "flag": 1,
          "name": "我是标题"
        }
      },
      commonHeadHeight: {
        type: Object,
        value: {}
      }
    },
    data: {
   
    }, // 私有数据，可用于模版渲染
   
    lifetimes: {
      // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
      attached: function() {},
      moved: function() {},
      detached: function() {},
    },
   
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {}, // 此处attached的声明会被lifetimes字段中的声明覆盖
    ready: function() {
      var that = this;
      wx.getSystemInfo({
        success(res) {
          // console.log(res.model)
          // console.log(res.pixelRatio)
          // console.log(res.windowWidth)
          // console.log(res.windowHeight)
          // console.log(res.screenHeight)
          // console.log(res.language)
          // console.log(res.version)
          // console.log(res.statusBarHeight)
   
          that.setData({
            "commonHeadHeight.statusBarHeight": (34 * 2),
            "commonHeadHeight.titleHeight": res.statusBarHeight + 46
          });
   
        }
      })
    },
   
    pageLifetimes: {
      // 组件所在页面的生命周期函数
      show: function() {
        
      },
    },
   
    methods: {
      commonHead_left_back: function() {
        console.log("back")
        wx.reLaunch({
          url: '/pages/my/my'
        });
      },
      commonHead_left_home: function() {
        console.log("home")
        wx.reLaunch({
          url: '/pages/home/home'
        })
      }
    }
})