//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tip_display:"none",
    tip_text:"",
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
    console.log(event);
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
  },

  login:function(event){
    var that=this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/login',
      data: {
         account:event.detail.value.account,
         password:event.detail.value.password,
      },
      header: {  
        "Content-Type": "application/x-www-form-urlencoded",
      }, 
      method: 'POST', 
      success: function(res){
        //console.log(res);
        // success
        if(res.data.errorcode==0){
          wx.setStorageSync('account', res.data.data);
          that.data.model.login_register="none";
          that.data.model.info="block";
          //that.data.tip="block";
          that.setData({
            tip_display:"block",
            tip_text:res.data.message,
          });
          setTimeout(function(){
            that.setData({
              model:that.data.model,
              img:app.globalData.img,
              nickName:app.globalData.nickName,
              tip_display:"none",
            });
          },1500);
        }else{
          that.setData({
            tip_display:"block",
            tip_text:res.data.message,
          });
          setTimeout(function(){
            that.setData({
              tip_display:"none",
            });
          },1500);
        }  
      }
    })
  },

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
        console.log(res);
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
          wx.setStorageSync('account', res.data.data);
          that.data.model.login_register="none";
          that.data.model.info="block";
          //that.data.tip="block";
          that.setData({
            tip_display:"block",
            tip_text:res.data.message,
          });
          setTimeout(function(){
            that.setData({
              model:that.data.model,
              img:app.globalData.img,
              nickName:app.globalData.nickName,
              tip_display:"none",
            });
          },1500);
        }else{
          that.setData({
            tip_display:"block",
            tip_text:res.data.message,
          });
          setTimeout(function(){
            that.setData({
              tip_display:"none",
            });
          },1500);
        }
      }
    })
  },


})
