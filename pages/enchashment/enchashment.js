//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
   
    // popup: "none",
    flag: true
  },
  
  

 // this.data.popup = 'block';
 popup: function() {
    // this.data.popup = 'block';
    this.setData({flag: false}) 
  },
 
 outpopup: function() {
    // this.data.popup = 'none';
    this.setData({flag: true}) 
  },
  
  onLoad:function(){
    var that = this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/getBank.html', 
      data: {'account':wx.getStorageSync('account')},
      method:'GET',
      header: {
          'content-type': 'application/json',
      },
      success: function(res) {
        console.log(res.data);
        var re = true;
        var re2 = false;
        if(res.data.errorcode == 0){
          re = false;
          re2 = true;
        }
        that.setData({
            have_bank1:re2,
            have_bank2:re,
            bank:res.data.data
        });
      }
    })
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var that = this;
    var cart_id = e.detail.value.cart_id;
    var bank_name = e.detail.value.bank_name;
    var name = e.detail.value.name;
    var phone = e.detail.value.phone;
    var str = '';
    if(cart_id == ''){
      str += '银行卡号\n';
    }
    if(bank_name == ''){
      if(str == ''){
        str += '银行名称';
      }else{
        str += '、银行名称';
      }
    }
    if(name == ''){
      if(str == ''){
        str += '真实姓名';
      }else{
        str += '、真实姓名';
      }
    }
    if(phone == ''){
      if(str == ''){
        str += '手机号码';
      }else{
        str += '、手机号码';
      }
    }
    if(str != ''){
      str += '为空，请填写';
      wx.showModal({
        title: '提示',
        content: str,
        showCancel: false,
        success: function(res) {}
      })
      return false;
    }
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/addBank.html', 
      data: {'cart_id':cart_id,'bank_name':bank_name,'name':name,'phone':phone,'account':wx.getStorageSync('account')},
      method:'GET',
      header: {
          'content-type': 'application/json',
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          flag: true,
          have_bank1:false,
          have_bank2:true,
          bank:{
            cart_id:cart_id,
            bank_name:bank_name,
            name:name,
            phone:phone
          }
        })

      }
    })
      
  },

  tixian: function(e) {
    var that = this;
    var str = '';
    var amount = e.detail.value.amount;
    console.log(amount);
    var have_bank = that.data.have_bank;

    if(have_bank == 0){
      str = '未添加银行卡信息';
      wx.showModal({
        title: '提示',
        content: str,
        showCancel: false,
        success: function(res) {}
      })
      return false;
    }
    if(amount <= 0){
      str = '提现金额不能低于等于0';
      wx.showModal({
        title: '提示',
        content: str,
        showCancel: false,
        success: function(res) {}
      })
      return false;
    }
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/tixian.html', 
      data: {'account':wx.getStorageSync('account'),'amount':amount},
      method:'GET',
      header: {
          'content-type': 'application/json',
      },
      success: function(res) {
        console.log(res.data);
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
          success: function(r) {
            if(res.errorcode != 0){
              wx.navigateTo({
                url: '../../pages/wallet/wallet'
              })
            }
          }
        })
        // location.reload();
      }
    })
  }
})
