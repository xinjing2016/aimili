// pages/forget/forget.js
Page({
  data:{},
  send_verify:function(event){
    var that=this;
    console.log(event.detail.value.phone);
    that.setData({
      phone:event.detail.value.phone,
    });
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/send_verify',
      data: {
        phone:that.data.phone,
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
  },

  register:function(event){
    var that=this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/forgetPassword',
      data: {
        phone:event.detail.value.phone,
        password:event.detail.value.password,
        verify_code:event.detail.value.verify_code,
        repassword:event.detail.value.repassword,
      },
      method: 'POST',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded",
      },
      success: function(res){
        if(res.data.errorcode==0){
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function(){
              wx.navigateBack({
                delta: 1
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
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})