//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },

  //发送验证码
  send_message:function(event){
    var that=this;
    that.setData({
      phone:event.detail.value.phone,
    });
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/send_verify',
      data: {
        phone:event.detail.value.phone
      },
      method: 'GET',
      success: function(res){
        // success
        if(res.data.errorcode==0){
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 1500
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
    //event.detail.value.phone
  },

  //修改手机号
  modify_phone:function(event){
    var that=this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/modify_phone',
      data: {
        phone:that.data.phone,
        verify_code:event.detail.value.verify_code,
      },
      method: 'GET', 
       header: {
         'Cookie':wx.getStorageSync('account'),
       },
      success: function(res){
        if(res.data.errorcode==0){
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

   onShow:function(){ // 页面显示

   var that=this;   
 wx.request({  //账户余额信息
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_user_info',
      data: {},
      method: 'GET', 
      header: {
        'Cookie' : wx.getStorageSync('account')
      }, // 设置请求的 header
      success: function(res){
      
        if(res.data.errorcode==0){

            that.setData({
              phone:res.data.data['phone'],            
            });
        }
      }
    })

 
   
   },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '修改手机号',
      success: function(res) {
        // success
      }
    })
  }
})
