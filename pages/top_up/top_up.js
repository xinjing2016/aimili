//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    items: [
      {name: '￥20', value: '20' ,checked: 'true'},
      {name: '￥50', value: '50'},
      {name: '￥100', value: '100'},
      {name: '￥200', value: '200'},
      {name: '￥500', value: '500'},
      {name: '￥1000', value: '1000'},
    ]
  },
  select_balance:function(event) {
   this.setData({
      balance:event.detail.value
    })
  },

  top_up:function(event){  //充值钱包
    var that=this;
    var balance=that.data.balance;
 
    wx.showModal({
       title: '提示',
       content: '确认充值爱美丽钱包？',
       success: function(res) {
         if (res.confirm) {
            console.log(balance);

                 wx.login({      //获取code
                  success: function(res){
                  if (res.code) {
                    console.log(res);
                
                wx.request({//请求微信支付
url: 'https://www.gaoliuxu.com/index.php/Home/Wx/jsapi',
                data: {
                      code:res.code,
                      amount:balance
                    },
                  method: 'GET',
                  header: {
            'Cookie' : wx.getStorageSync('account'),
          },              
            success: function(re){
                console.log(re);
            wx.requestPayment({ 
                'timeStamp': re.data.timeStamp,
                'nonceStr': re.data.nonceStr,
                'package': re.data.package,
                'signType': 'MD5',
                'paySign': re.data.paySign,
                'success':function(res){  //微信支付成功
               
               wx.request({ 
               url:  'https://www.gaoliuxu.com/index.php/Home/Index/top_up',
                data: {
                  amount:balance,
                },
                method: 'GET',
                header: {
                  'Cookie' : wx.getStorageSync('account'),
                }, // 设置请求的 header
                success: function(res){

                    if(res.data.errorcode==0){
                      wx.showToast({
                        title: res.data.message,
                        icon: 'loading',
                        duration: 1500
                      })
                  setTimeout(function(){ //
                    wx.redirectTo({
                    url: '../../pages/wallet/wallet'
                                          });   
                    },1500);

                    }else{
                        wx.showToast({
                        title: res.data.message,
                        icon: 'loading',
                        duration: 1500
                      })
                  setTimeout(function(){ //
                    wx.redirectTo({
                    url: '../../pages/wallet/wallet'
                                          });   
                    },1500);
                    }

                }            
                })

            },
                'fail': function() { //支付失败
                  // fail
                }
              })
               
                }
              })
               }else{
                 console.log('获取用户登录态失败！' + res.errMsg);
                 }
               }
             })   

         }
        } 
     })
  },

  onLoad:function(){
    var that=this;
    wx.setNavigationBarTitle({
      title: '钱包充值'
    })
    this.setData({
      balance:'20', //默认充值金额
    })
    
  }
})
