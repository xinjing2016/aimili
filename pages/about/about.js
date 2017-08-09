//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
  },

  onLoad: function () {
    var that = this;
    wx.setNavigationBarTitle({
      title: '关于我们',
      success: function(res) {
        // success
      }
    }),
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/about_us',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        that.setData({
            about:res.data.data
        });
        console.log(res);
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }
})
