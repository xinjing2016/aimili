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
        
        //console.log(res);
        
      }
    })
    // this.data.model.login_register="none";
    // this.data.model.info="block";
    // console.log("nickName:"+app.globalData.nickName);
    // this.setData({
    //   model:this.data.model,
    //   img:app.globalData.img,
    //   nickName:app.globalData.nickName,
    // });
  },

  get_verify:function(event){
    console.log(document);
    
  }
})
