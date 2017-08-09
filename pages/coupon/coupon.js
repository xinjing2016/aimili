//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    select_normal:"select",
    select_used:"",
    select_expired:"",
    normal_view:"block",
    used_view:"none",
    expired_view:"none",
  },
 
  //选择类型
  click:function(event){
    var that=this;
    var index=event.target.dataset.index;
    console.log(event);
    if(index==1){
      that.data.select_normal="select";
      that.data.select_used="";
      that.data.select_expired="";
      that.data.normal_view="block";
      that.data.used_view="none";
      that.data.expired_view="none";
    }else if(index==2){
      that.data.select_normal="";
      that.data.select_used="select";
      that.data.select_expired="";
      that.data.normal_view="none";
      that.data.used_view="block";
      that.data.expired_view="none";
    }else if(index==3){
      that.data.select_normal="";
      that.data.select_used="";
      that.data.select_expired="select";
      that.data.normal_view="none";
      that.data.used_view="none";
      that.data.expired_view="block";
    }
    that.setData({
      select_normal:that.data.select_normal,
      select_used:that.data.select_used,
      select_expired:that.data.select_expired,
      normal_view:that.data.normal_view,
      used_view:that.data.used_view,
      expired_view:that.data.expired_view,
    });
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '我的优惠券',
      success: function(res) {
        // success
      }
    })
    var that=this;
    if(wx.getStorageSync('account')){
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_user_coupon',
        data: {},
        method: 'GET', 
        header: {
          'Cookie' : wx.getStorageSync('account'),
        }, // 设置请求的 header
        success: function(res){
          console.log(res.data.data);
          var coupon=res.data.data;
          var normal;
          var expired;
          var used;
          if(coupon["normal"]!=null){
            normal=coupon["normal"];
          }
          if(coupon["expired"]!=null){
            expired=coupon["expired"];
          }
          if(coupon["used"]!=null){
            used=coupon["used"];
          }
      
          that.setData({
            normal:normal,
            expired:expired,
            used:used,
          })
        }
      })
    }
  }
})
