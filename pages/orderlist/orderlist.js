//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    model:{
      0:{
        key:"all",
        show:"block",
        select:"selected"
      },
      1:{
        key:"dfk",
        show:"block",
        select:""
      },
      2:{
        key:"dct",
        show:'block',
        select:""
      },
      3:{
        key:"dfh",
        show:"block",
        select:""
      },
      4:{
        key:"dsh",
        show:"block",
        select:""
      },
      5:{
        key:"dpj",
        show:"block",
        select:""
      },
      6:{
        key:"ptsb",
        show:"block",
        select:""
      },
      7:{
        key:"ddqx",
        show:"block",
        select:""
      }
    }
  },

  //选择模块
  select_model:function(event){
    var model=event.target.dataset.model;
    if(model=="all"){
      for(var i in this.data.model){
        this.data.model[i]["show"]="block";
        this.data.model[i]["select"]="";
      }
      this.data.model[0]["select"]="selected";
    }else{
      for(var i in this.data.model){
        if(this.data.model[i]["key"]==model){
          this.data.model[i]["select"]="selected";
          this.data.model[i]["show"]="block";
        }else{
          this.data.model[i]["select"]="";
          this.data.model[i]["show"]="none";
        }
      }
    }
    this.setData({
      model:this.data.model
    });
  },

  //支付订单
  pay_order:function(event){
    var that=this;

    var select_order;     //要支付的订单
    var add_price='0';     //单品购物支付的金额
    var discount='0';      //单品购物优惠的金额
  
    var order_id=event.target.dataset.order_id;
      for(var i in that.data.order){
         if(that.data.order[i]["order_id"]==order_id){
             select_order=that.data.order[i]['goods'];

            }
      }


       for(var i in  select_order){
          select_order[i]['num']=select_order[i]['goods_num'];
             
           add_price =parseFloat(add_price)+parseFloat(select_order[i]['discount_price'])*select_order[i]['goods_num'];
           discount =parseFloat(discount)+parseFloat(select_order[i]['price']-select_order[i]['discount_price'])*select_order[i]['goods_num'];
    
  
      }
/*
      console.log('hello');
      console.log(toDecimal(add_price));
      console.log(toDecimal(discount));
      console.log( select_order);
*/    
console.log(toDecimal(add_price));
 console.log(toDecimal(discount));

console.log('我的订单'+order_id);
      app.order_id=order_id;
      app.order_goods=select_order;
      app.order_add_price=toDecimal(add_price);
      app.order_discount=toDecimal(discount);
      if((add_price>0)  ){
          wx.navigateTo({
            url: '../../pages/confirm_order/confirm_order?type=order_pay'
          })
      }else{

         wx.showToast({
                title: '当前订单不能进行支付',
                icon: 'success',
                duration: 1500
              })
      }
  },

  //取消订单
  cancel_order:function(event){
    var that=this;
    var order_id=event.target.dataset.order_id;
    wx.showModal({
      title: '提示',
      content: '确定取消订单？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.gaoliuxu.com/index.php/Home/Index/cancel_order',
            data: {
              order_id:order_id
            },
            method: 'GET',
            header: {
              'Cookie' : wx.getStorageSync('account'),
            }, // 设置请求的 header
            success: function(res){
              wx.showToast({
                title: res.data.message,
                icon: 'success',
                duration: 2000
              })
              if(res.data.errorcode==0){
                for(var i in that.data.order){
                  if(that.data.order[i]["order_id"]==order_id){
                    that.data.order[i]["cancel"]=1;
                  }
                }
                that.setData({
                  order:that.data.order
                })
              }
            }
          })
        }
      }
    })
  },

  //邀请参团
  invite:function(event){
   
    //var that=this;
   // var order_id=event.target.dataset.order_id;
   // this.onShareAppMessage(order_id);

    var order_id=event.currentTarget.dataset.order_id;
    for(var i in this.data.order){
      if(this.data.order[i]["order_id"]==order_id){
        app.order=this.data.order[i];
        console.log(app.order);
      }
    }
    wx.navigateTo({
      url: '../../pages/orderdetail_tuan/orderdetail_tuan'
    })

  },

  //确认收货
  confirm:function(event){
    var that=this;
    var order_id=event.target.dataset.order_id;
    wx.showModal({
      title: '提示',
      content: '确定收货？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.gaoliuxu.com/index.php/Home/Index/confirm_order',
            data: {
              order_id:order_id
            },
            method: 'GET',
            header: {
              'Cookie' : wx.getStorageSync('account'),
            }, // 设置请求的 header
            success: function(res){
              wx.showToast({
                title: res.data.message,
                icon: 'success',
                duration: 2000
              })
              if(res.data.errorcode==0){
                for(var i in that.data.order){
                  if(that.data.order[i]["order_id"]==order_id){
                    that.data.order[i]["confirm"]=1;
                  }
                }
                that.setData({
                  order:that.data.order
                })
           setTimeout(function(){ //跳转订单
            var order_id=event.target.dataset.order_id;
              wx.navigateTo({
                url: '../../pages/comment/comment?order_id='+order_id });   
                    },2000);

              }
            }
          })
        }
      }
    })
  },

  //订单详情
  order_detail:function(event){
    var order_id=event.currentTarget.dataset.order_id;
    for(var i in this.data.order){
      if(this.data.order[i]["order_id"]==order_id){
        app.order=this.data.order[i];
        console.log(app.order);
      }
    }
    wx.navigateTo({
      url: '../../pages/orderdetail/orderdetail'
    })
  },

  //订单评价
  evaluate:function(event){
    var that=this;
    var order_id=event.target.dataset.order_id;
    wx.navigateTo({
      url: '../../pages/comment/comment?order_id='+order_id
    })
  },

  onShow:function(){
    //this.onLoad();
  },

  onLoad: function (query) {
    wx.setNavigationBarTitle({
      title: '我的订单',
      success: function(res) {
        // success
      }
    })
    
    if(query.ty){
      for(var i in this.data.model){
        if(this.data.model[i]["key"]==query.ty){
          this.data.model[i]["show"]="block";
          this.data.model[i]["select"]="selected";
        }else{
          this.data.model[i]["show"]="none";
          this.data.model[i]["select"]="";
        }
      }
      this.setData({
        model:this.data.model
      });
    }

    var that=this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/user_order_list',
      data: {},
      method: 'GET',
      header: {
        'Cookie' : wx.getStorageSync('account'),
      }, // 设置请求的 header
      success: function(res){
        var order=res.data.data;
        for(var i in order){
          for(var j in order[i]["goods"]){
            order[i]["goods"][j]["display_img"]=JSON.parse(order[i]["goods"][j]["display_img"]);
          }
        }
 console.log(order);
        that.setData({
          order:order,
        });
      }
    })
  },

//分享
  onShareAppMessage: function () {
    return {
      title: '团购',
      desc: '来参加我的团',
      path: '../../pages/index/index'
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

