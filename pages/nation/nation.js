//index.js
//获取应用实例
var app = getApp()
Page({
  data: {

  },
  onLoad: function () {
    var that=this;
    wx.setNavigationBarTitle({title: '国家馆'});
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/nation',
      data: {},
      method: 'GET', 
      success: function(res){
        console.log(res);
        that.setData({
          nation_list:res.data.data
        });
      }
    })
  }
})
