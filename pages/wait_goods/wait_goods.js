//index.js
//获取应用实例  
var app = getApp()  
Page( {  
 data: {
    more_address:"none",      
  },
  
  //更多地址（显示隐藏）
  show_hide:function(){
   
    var that=this;
     console.log(that);
    if(that.data.more_address=="none"){
      that.setData({
        more_address:'block'
      })
    }else{
      that.setData({
        more_address:'none'
      })
    }
    
  },
  //选择地址
  select_address:function(event){
    var that=this;
    var index=event.currentTarget.dataset.address_index;
    that.setData({
      selected_address:that.data.user_address[index],
    });
  }, 
  
  onLoad: function(option) {  
    wx.setNavigationBarTitle({
      title: '团购商品详情',
      success: function(res) {
      }
    })

    this.setData({

      img_satar:app.globalData.img,
     
    });

    var that=this;
    //获取用户收货地址
    if(wx.getStorageSync('account')){
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_user_address',
        data: {},
        method: 'GET', 
        header: {
          'Cookie' : wx.getStorageSync('account'),
        }, // 设置请求的 header
        success: function(res){
          var address=res.data.data;
          for(var i in address){
            address[i]["detail"]=JSON.parse(address[i]["detail"]);
            if(address[i]["default_address"]==1){
              that.setData({
                selected_address:address[i],
              });
            }
          }
          that.setData({
            user_address:address,
            add_price:app.order_add_price,
            discount:app.order_discount
          });
        }
      })
    }else{ //用户没有登录
           
        wx.switchTab({
        url: '../../pages/user/user'
      });                       
      
   /*
      wx.switchTab({
        url: '../../pages/index/index'
      })
    */
    } 

   //等待团购的请求 
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/wait_goods_info',
      data: {
        orders_id:option.orders_id
      },
      method: 'GET', 
      success: function(res){
      // console.log(wx.getStorageSync('account'));
      console.log(order=res.data.data[0]);
      console.log('hello');

        var order=res.data.data[0];
       order['goods'][0]['display_img']=JSON.parse(order['goods'][0]['display_img']);
        that.setData({
          order:order,
          account:wx.getStorageSync('account'),
        }),      
         //等待拼团商品的倒计时
    countdown( that,order['order_time']) 
      }
    })
   

  },

  //团购下单
  orderdetail_group:function(){
    var that=this;
    if(wx.getStorageSync('account')){
     //console.log(this.data);

      var pay_type=2;
      var consignee_type=1;
       wx.request({  // 查看账户用户名         
              url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_name',
             method: 'GET',
              header: {
                'Cookie' : wx.getStorageSync('account'),
              }, // 设置请求的 header
              success: function(resd){
               var new_name =resd.data.data;
               var order_account=that.data.order['account'];

               if(new_name== order_account){
                      wx.showToast({
                          title: '不能加入自己发起的团购',
                          icon: 'success',
                          duration: 5000
                      })
                 }else{
                       wx.showModal({
                      title: '提示',
                      content: '确认下单？',
                      success: function(res) {
                        
                      wx.request({          
                          url: 'https://www.gaoliuxu.com/index.php/Home/Index/group_shopping',
                          data: {
                            order:that.data.order,
                            consignee_type:consignee_type,
                            pay_type:pay_type,
                            order_type:1,
                            pay:0,  //团购未付款
                            address:that.data.selected_address,
                          },
                          method: 'GET',
                          header: {
                            'Cookie' : wx.getStorageSync('account'),
                          }, // 设置请求的 header
                          success: function(resd){


                            if(resd.data.errorcode==0){
                                wx.showToast({
                                  title: '团购成功',
                                  icon: 'success',
                                  duration: 5000
                                })
                                setTimeout(function(){ //跳转到 我的订单
                                    wx.redirectTo({
                                      url: '../../pages/orderlist/orderlist'
                                    });   
                                },1500);
                              }
                              
                            }
                            
                          });  
                      }
                    });
                      
                    }
 
                }
                
              }); 
  
    }else{
      wx.showToast({
          title: "未登录",
          icon: 'success',
          duration: 1500
      })
    }
    //console.log("order");
  },  
  
})  

       
/* 毫秒级秒杀倒计时 */  
function countdown(that,buyTime) {

    var dd =(new Date()).valueOf();
    //过期日期
   var last_time = Date.parse(new Date(buyTime.replace(/-/g,"/")))+3600*24*1000; 
     //var last_time = Date.parse(new Date(buyTime.replace(/-/g,"/")))+5*60*1000; 

       //相差毫秒数量   
       var wait_time =last_time-dd;

       // 渲染倒计时时钟  
       that.setData({  
         clock:dateformat(wait_time)//格式化时间  
       });  
       
       if (wait_time <= 0) {  
         that.setData({  
           clock:"拼团结束"  
         });  
         // timeout则跳出递归  
         return ;  
       }    
      
       //settimeout实现倒计时效果  
       setTimeout(function(){  
        // 放在最后--  
        wait_time -= 1000;  
        countdown(that,buyTime);  
      }  
      ,1000)//注意毫秒的步长受限于系统的时间频率，于是我们精确到0.01s即10ms  
}  
       
// 时间格式化输出，如1天天23时时12分分12秒秒12 。每10ms都会调用一次  
 function dateformat(micro_second) {  
       // 总秒数  
       var second = Math.floor(micro_second / 1000);  
       // 天数  
       var day = Math.floor(second / 3600/24);  
       // 总小时  
       var hr = Math.floor(second / 3600);  
       // 小时位  
       var hr2 = hr%24;  
       // 分钟位  
       var min = Math.floor((second - hr * 3600) / 60);  
       // 秒位  
      var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;  
      // 毫秒位，保留2位  
      var micro_sec = Math.floor((micro_second % 1000) / 10);  
      return hr2 + ":" + min + ":" + sec ;  
}  

