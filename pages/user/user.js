//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    model:{
      login:"block",
      register:'none',
      login_register:"block",
      info:"none",
    },
    'class':{
      login:"",
      register:"rg_lg_btn"
    }
  },

  click:function(event){
    //console.log(event);
    if(event.target.dataset.name=="login"){
      this.data.model["login"]="block";
      this.data.model["register"]="none";
      this.data.class["login"]="";
      this.data.class["register"]="rg_lg_btn";
    }else if(event.target.dataset.name=="register"){
      this.data.model["login"]="none";
      this.data.model["register"]="block";
      this.data.class["login"]="rg_lg_btn";
      this.data.class["register"]="";
    }
    this.setData({
      model:this.data.model,
      'class':this.data.class,
    });
  },

  un_login:function(){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定退出登录？',
      success: function(res) {
        if (res.confirm) {
          wx.showToast({
            title: '退出登录成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function(){
            wx.clearStorageSync("account");
            that.data.model.login_register="block";
            that.data.model.login="block";
            that.data.model.register="none";
            that.data.model.info="none";
            that.setData({
              model:that.data.model,
              tip_display:"none",
            });
            wx.switchTab({
              url: '../../pages/index/index',
            })
          },1500);
          
        }
      }
    })
    
  },

  login:function(event){ //用户登录
    var that=this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/login',
      data: {
         account:event.detail.value.account,
         password:event.detail.value.password,
         img:app.globalData.img,

      },
      header: {  
        "Content-Type": "application/x-www-form-urlencoded",
      }, 
      method: 'POST', 
      success: function(res){
        //console.log(res);
        // success
        if(res.data.errorcode==0){
          
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1500
          })
   
          setTimeout(function(){
            wx.setStorageSync('account', res.data.data);
            that.data.model.login_register="none";
            that.data.model.info="block";
            that.setData({
              model:that.data.model,
              img:app.globalData.img,
              nickName:app.globalData.nickName,
            });
          },1500);
        }else{
          wx.showToast({
            title: '登录失败',
            icon: 'success',
            duration: 1200
          })
        }  
      }
    })
  },

  send_verify:function(event){
    var that=this;
    //console.log(event.detail.value.phone);
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
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/register',
      data: {
        phone:that.data.phone,
        account:event.detail.value.account,
        nickname:event.detail.value.nickname,
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
            title: '注册成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(function(){
            wx.setStorageSync('account', res.data.data);
            that.data.model.login_register="none";
            that.data.model.info="block";
            that.setData({
              model:that.data.model,
              img:app.globalData.img,
              nickName:app.globalData.nickName,
            });
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

  //拨打客服电话
  call_phone:function(){
    wx.makePhoneCall({
      phoneNumber: '4000800168',
    })
  },

 onShow:function(){ // 页面显示

   var that=this;
     if(wx.getStorageSync('account')!=null){
     
      wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/check_login',
      data: {},
      method: 'GET', 
      header: {
        'Cookie' : wx.getStorageSync('account')
      }, // 设置请求的 header
      success: function(res){
        if(res.data.errorcode==0){
          
            that.data.model.login_register="none";
            that.data.model.info="block";
            that.setData({
              model:that.data.model,
              img:app.globalData.img,
              nickName:app.globalData.nickName,
            });
        }
      }
    }),

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
   
   },
   
  onLoad:function(){
    var that=this;
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
  
    
  }
})
