//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
  },
  
  onLoad: function () {
    var that=this;
    wx.setNavigationBarTitle({
      title: '我的钱包'
    })
   
   
    wx.request({  //账户余额信息
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/user_extend',
      data: {},
      method: 'GET', 
      header: {
        'Cookie' : wx.getStorageSync('account')
      }, // 设置请求的 header
      success: function(res){
      
        if(res.data.errorcode==0){

            that.setData({
              balance:res.data.data['balance'],
             
            });
        }
      }
    })
  }
})
