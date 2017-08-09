//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    receiving_time:'',//收货时间
    selected_address:'null',
    more_address:"none",
    showup:"none",
    showup2:"none",
    pay_type:"微信支付",
    order_goods:{
      0:{
        goods_id	:	null,
        content	:	null,
        price	:	null,
        discount_price	:	null,
        num	:	null,
        display_img : null,
        checked	:	null
      }
    },
    selected:{
      s1:"",
      s2:"text_black",
      s3:"",
    },
  },
  
  // 选择收货时间
  click:function(event){
   
    for(var i in this.data.selected){
      if(i==event.target.dataset.name){
        this.data.selected[i]="text_black";
      }else{
        this.data.selected[i]="";
      }
    }
    this.setData({
      selected:this.data.selected,
            receiving_time_id:event.target.dataset.receiving_time_id,  //收货时间id
       receiving_time:event.target.dataset.receiving_time,  //收货时间
    });
  },

  //收货时间（显示隐藏）
  couponshow2:function(){
    var that=this;
    if(that.data.showup2=="none"){
      that.setData({
        showup2:'block'
      })
      }
      else{
        that.setData({
          showup2:"none"
        })
      }
    },

  //更多地址（显示隐藏）
  show_hide:function(){
    var that=this;
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
  //优惠券（显示隐藏）
  couponshow:function(){
    var that=this;
    if(that.data.showup=="none"){
      that.setData({
        showup:'block'
      })
      }
      else{
        that.setData({
          showup:"none"
        })
      }
    },
  
  //选择配送方式
  radioChange:function(event){
    this.setData({
      consignee_type:event.detail.value,
    });
  },

   //选择优惠券
  radioChange_coupon:function(event){
   
    var that=this;
    var couponId=event.detail.value;  //选中的优惠卷id
    var coupon;
    
    for(var i in that.data.coupon.coupon){
      if(that.data.coupon.coupon[i]["coupon_id"]==couponId){
        coupon=that.data.coupon.coupon[i];
      }
    }

    for(var i in that.data.coupon.user_coupon){
      if(that.data.coupon.user_coupon[i]["coupon_id"]==couponId){
        coupon=that.data.coupon.user_coupon[i];
      }
    }

    
    //优惠券金额   
    var youhui_price= parseFloat(coupon["coupon_price"]);

    var sum_price=0;          //商品总价格 
    var add_price='0.00';     //显示要支付的金额   
    for(var i in that.data.order_goods){
      sum_price= sum_price+(that.data.order_goods[i]["num"]*that.data.order_goods[i]['discount_price']);
      sum_price= parseFloat( sum_price);
    }
  
    if( sum_price >youhui_price){  //总价格大于优惠券金额
      add_price = sum_price-youhui_price;
    }

    this.setData({
      coupon_id:event.detail.value,
      add_price:toDecimal(add_price),
    
    })
  },
  


   //选择付款方式
   radioChange_pay:function(event){
     this.setData({
       pay_type:event.detail.value
     })
   },

  //增加数量
  increase:function(event){  
    var that=this;
    var index=event.target.dataset.index;
    that.data.order_goods[index]["num"]=parseFloat(that.data.order_goods[index]["num"])+1;
    that.data.add_price=parseFloat(that.data.add_price)+parseFloat(that.data.order_goods[index]["discount_price"]);
      that.data.discount=parseFloat(that.data.discount)+(parseFloat(that.data.order_goods[index]["price"])-parseFloat(that.data.order_goods[index]["discount_price"]));

    that.setData({
      order_goods:that.data.order_goods,
      add_price:toDecimal(that.data.add_price),
      discount:toDecimal(that.data.discount),
    });


  },

  //减少数量
  decrease:function(event){
    var that=this;
    var index=event.target.dataset.index;
    if(that.data.order_goods[index]["num"]<=1){
      wx.showModal({
        title: '提示',
        content: '是否将商品移出？',
        success: function(res) {
          if (res.confirm) {
            var order_goods=that.data.order_goods;
            var ne=new Object();
            var add_price=0;
            var discount=0;
            for(var i in order_goods){
              if(i!=index){
                ne[i]=order_goods[i];
                add_price=add_price+order_goods[i]["discount_price"]*order_goods[i]["num"];
                discount=discount+(order_goods[i]["price"]-order_goods[i]["discount_price"])*order_goods[i]["num"];
              }
            }
            that.setData({
              order_goods:ne,
              add_price:toDecimal(add_price),
              discount:toDecimal(discount),
            });
          }
        }
      })
    }else{
      that.data.order_goods[index]["num"]=parseFloat(that.data.order_goods[index]["num"])-1;
      that.data.add_price=parseFloat(that.data.add_price)-parseFloat(that.data.order_goods[index]["discount_price"]);
      that.data.discount=parseFloat(that.data.discount)-(parseFloat(that.data.order_goods[index]["price"])-parseFloat(that.data.order_goods[index]["discount_price"]));
    }
    
    that.setData({
      order_goods:that.data.order_goods,
      add_price:toDecimal(that.data.add_price),
      discount:toDecimal(that.data.discount),
    });

  },

  //选择地址
  select_address:function(event){
    var that=this;
    var index=event.currentTarget.dataset.address_index;
    that.setData({
      selected_address:that.data.user_address[index],
    });
  },

  //提交订单
  submit_order:function(){
    var that=this;
  
    if(this.data.selected_address=='null'){
        wx.showToast({
          title: '请添加收货地址',
          icon: 'success',
          duration: 2000
      })
    }else if(!this.data.receiving_time_id){
       wx.showToast({
          title: '请选择收货时间',
          icon: 'success',
          duration: 2000
      })

    }else if(!this.data.consignee_type){
      wx.showToast({
          title: '未选择配送方式',
          icon: 'success',
          duration: 2000
      })
    } else{
      if(!this.data.pay_type){
        
      }else{
        var coupon;
         var run='1';
        if(!that.data.coupon_id){
          coupon=null;
        }else{

          for(var i in that.data.coupon.coupon){
            if(that.data.coupon.coupon[i]["coupon_id"]==that.data.coupon_id){
              coupon=that.data.coupon.coupon[i];
            }
          }
          for(var i in that.data.coupon.user_coupon){
            if(that.data.coupon.user_coupon[i]["coupon_id"]==that.data.coupon_id){
              coupon=that.data.coupon.user_coupon[i];
            }
          }

          //优惠券使用最低限制
          var reach_price= parseFloat(coupon["reach_price"]); 
          
          //优惠券金额  
          var youhui_price= parseFloat(coupon["coupon_price"]);

          var sum_price='0';          //商品总价格 
          var add_price='0';          //显示要支付的金额   
          for(var i in that.data.order_goods){
            sum_price= sum_price+(that.data.order_goods[i]["num"]*that.data.order_goods[i]['discount_price']);
            sum_price= parseFloat( sum_price);
          }

          if(sum_price<reach_price){//商品总价格低于优惠券限制
            run='2';
          }
  
        }

        if(run=='2'){
      wx.showToast({
          title: '满'+reach_price+'元,才能使用此优惠券',
          icon: 'loading',
          duration: 1500
        }) 
    }else{ 
      
       var consignee_type;
        if(that.data.consignee_type=="快递"){
          consignee_type=0;
        }else if(that.data.consignee_type=="自提"){
          consignee_type=1;
        }

       var pay_type;
        if(that.data.pay_type=="微信支付"){
          pay_type=2;
        }else if(that.data.pay_type=="余额支付"){
           pay_type=3;
        }
/*
        var amount; //支付的金额
        if(coupon==null){
          amount=that.data.add_price;
        }else{
          amount=that.data.add_price-coupon["coupon_price"];
        }
*/
        var amount=that.data.add_price;  //支付的金额
 var receiving_time_id=this.data.receiving_time_id  //配送时间id
           
     
     var order_wxpay=randomNum(4);    //商品下单凭证
     pay_type=3;
       wx.showModal({
          title: '提示',
          content: '确认下单？',
          success: function(res) {
            if (res.confirm) {

            if(pay_type==3){//余额支付 

            var balance =that.data.balance;  //用户当前余额
            
              if(balance<amount){    //余额不足
               var whectMoney =amount-balance; //微信端支付的钱

                wx.login({ //用户登录 code
                 success: function(res){
                  if (res.code) {
                   console.log(res);
              
              wx.request({ //请求微信支付
                                        url: 'https://www.gaoliuxu.com/Wxpay/example/jsapi.php',
                        data: {
                            code:res.code,
                            amount:whectMoney,
                            order_wxpay:order_wxpay,
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
                         'success':function(res){
                        // success
          
                    wx.request({  //余额扣费操作
                    url: 'https://www.gaoliuxu.com/index.php/Home/Index/user_balance_shop_group',
                    data: {
                     amount:balance,
                     coupon:coupon,
                                        
                    },
                    method: 'GET',
                    header: {
                      'Cookie' : wx.getStorageSync('account'),
                    }, // 设置请求的 header
                    success: function(res){
                      if(res.data.errorcode==0){ 

                      wx.request({  //提交订单
                          url: 'https://www.gaoliuxu.com/index.php/Home/Index/new_order_group',
                          data: {
                            goods:that.data.order_goods,
                            consignee_type:consignee_type,
                            pay_type:pay_type,
                            order_type:1,
                            pay:1,
                            address:that.data.selected_address,
                            coupon:coupon,
                            order_wxpay:order_wxpay,
                            receiving_time_id:receiving_time_id,
                          },
                          method: 'GET',
                          header: {
                            'Cookie' : wx.getStorageSync('account'),
                          }, // 设置请求的 header
                          success: function(res){
                            if(res.data.errorcode==0){
 
                              wx.showToast({
                                title: res.data.message,
                                icon: 'success',
                                duration: 1500
                              })
                              setTimeout(function(){

                          wx.redirectTo({
                          url: '../../pages/orderlist/orderlist'
                                  });
                                
                              },1500);
                            }
                          }
                        })


                      }
                    }
                  }) 
                      },
                      fail: function() {
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

              }else{ //余额足够

                  wx.request({  //余额扣费操作
                    url: 'https://www.gaoliuxu.com/index.php/Home/Index/user_balance_shop_group',
                    data: {
                     amount:amount,
                     coupon:coupon,                
                    },
                    method: 'GET',
                    header: {
                      'Cookie' : wx.getStorageSync('account'),
                    }, // 设置请求的 header
                    success: function(res){
                  
                      if(res.data.errorcode==0){ 
                   

                      wx.request({  //提交订单
                          url: 'https://www.gaoliuxu.com/index.php/Home/Index/new_order_group',
                          data: {
                            goods:that.data.order_goods,
                            consignee_type:consignee_type,
                            pay_type:pay_type,
                            order_type:1,
                            pay:1,
                            address:that.data.selected_address,
                            coupon:coupon,
                            receiving_time_id:receiving_time_id,
                          },
                          method: 'GET',
                          header: {
                            'Cookie' : wx.getStorageSync('account'),
                          }, // 设置请求的 header
                          success: function(res){
                            if(res.data.errorcode==0){
                               
                              wx.showToast({
                                title: res.data.message,
                                icon: 'success',
                                duration: 1500
                              })
                              setTimeout(function(){

                          wx.redirectTo({
                          url: '../../pages/orderlist/orderlist'
                                  });
                                
                              },1500);
                            }
                          }
                        })

                      }
                    }
                  })

              }

            }else{     //微信支付    

             wx.login({//用户登录 code
                 success: function(res){
                  if (res.code) {
                   console.log(res);
              //请求微信支付
              wx.request({
                                        url: 'https://www.gaoliuxu.com/Wxpay/example/jsapi.php',
                        data: {
                            code:res.code,
                            amount:amount,
                            order_wxpay:order_wxpay,
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
                         'success':function(res){
                        // success
                        wx.request({ //提交订单
                          url: 'https://www.gaoliuxu.com/index.php/Home/Index/new_order_group',
                          data: {
                            goods:that.data.order_goods,
                            consignee_type:consignee_type,
                            pay_type:pay_type,
                            order_type:1,
                            pay:1,
                            address:that.data.selected_address,
                            coupon:coupon,
                            order_wxpay:order_wxpay,
                            receiving_time_id:receiving_time_id,
                          },
                          method: 'GET',
                          header: {
                            'Cookie' : wx.getStorageSync('account'),
                          }, // 设置请求的 header
                          success: function(res){
                            if(res.data.errorcode==0){

                              wx.showToast({
                                title: res.data.message,
                                icon: 'success',
                                duration: 1500
                              })
                              setTimeout(function(){

                       wx.redirectTo({
                       url: '../../pages/orderlist/orderlist'
                                  });
                               
                              },1500);
                            }
                          }
                        })
                      },
                      fail: function() {
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
          }
        });
        
      }

     }
      
    }
  },

  get_coupon:function(){
    var that=this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_can_use_coupon',
      data: {
   
      //add_price:that.data.add_price,
        add_price:app.order_add_price,
      },
      method: 'GET', 
      header: {
        'Cookie' : wx.getStorageSync('account'),
      }, // 设置请求的 header
      success: function(res){
        that.setData({
          coupon:res.data.data
        });
      }
    })
  },

  onReady:function(){
    this.get_coupon();
  },

   onShow:function(){
    
     var that=this;
   
    //收货地址
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
            add_price:toDecimal(app.order_add_price),
            discount:toDecimal(app.order_discount)
          });
        }
      })
    
      //账户余额信息
      wx.request({  
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

      //所有送货时间
      wx.request({  
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_dispatching_time',
      data: {},
      method: 'GET', 
      header: {
        'Cookie' : wx.getStorageSync('account')
      }, // 设置请求的 header
      success: function(res){
        console.log('我的快递方式');
        console.log(res.data.data);
      
        if(res.data.errorcode==0){

            that.setData({
              dispatching:res.data.data,             
            });
        }
      }
    })

    }else{
      wx.switchTab({
        url: '../../pages/index/index'
      })
    }
  },

  onLoad: function (query) {
    wx.setNavigationBarTitle({
      title: '团购下单',
      success: function(res) {
        // success
      }
    })
  
    var that=this;
    //onsole.log(app);
    var order_goods=new Array();
    if(query.type=="one_new_order"){
      var goods=app.order_goods[0];
      that.data.order_goods[0]["goods_id"]=goods["goods_id"];
      that.data.order_goods[0]["content"]=goods["name"];
      that.data.order_goods[0]["price"]=goods["price"];
      that.data.order_goods[0]["discount_price"]=goods["group_price"];
      that.data.order_goods[0]["num"]=1;
      that.data.order_goods[0]["display_img"]=goods["display_img"];
      that.data.order_goods[0]["checked"]="true";
      that.setData({
        order_goods:that.data.order_goods,
        'from':"goods",
      });
    }else{
      that.setData({
        order_goods:app.order_goods,
        'from':"collection",
      });
    }
   
   
  }
})

//保留两位小数点
function toDecimal(x) {       
   var f = parseFloat(x);        
   if (isNaN(f)) {
     return;        
   }        
   f = Math.round(x*100)/100;        
   return f;      
 } 

 //生成大写字母 a的Unicode值为97 
 function generateSmall_1(){  
   var str = [];  
   for(var i=97;i<123;i++){   
     str.push(String.fromCharCode(i));  
     }  
     return str; 
  }

/** 
* 生成指定位数的随机整数
*/ 
function randomNum(n){ 
  var num=''; 
  for(var i=0;i<n;i++){ 
      num+=Math.floor(Math.random()*10); 
  } 
  //当前时间戳
  var time=Date.parse(new Date())/1000;
  return 'pay'+time+'n'+num; 
}  


