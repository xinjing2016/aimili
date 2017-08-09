//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
  },

  //提交密码修改
  modify_password:function(event){
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/change_password',
      data: {
        old_password:event.detail.value.password,
        new_password:event.detail.value.new_password,
        re_new_password:event.detail.value.re_new_password,
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
       header: {
         'Cookie' : wx.getStorageSync('account'),
       }, // 设置请求的 header
      success: function(res){
        // success
        if(res.data.errorcode==0){
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          },1500);
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '修改登录密码',
      success: function(res) {
        // success
      }
    })
  }
})
