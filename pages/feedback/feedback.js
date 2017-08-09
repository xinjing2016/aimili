//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
  },

  //提交用户反馈
  formSubmit:function(event){
    var content= event.detail.value.content;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/user_feedback',
      data: {
        feedback:content,
      },
      method: 'GET', 
      header: {
        'Cookie' : wx.getStorageSync('account'),
      }, // 设置请求的 header
      success: function(res){
        wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500
        })
        setTimeout(function(){
          wx.navigateBack({
            delta: 1, 
          })
        },1500);
      }
    })
  },
  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '用户反馈',
      success: function(res) {
        // success
      }
    })
  },
})
