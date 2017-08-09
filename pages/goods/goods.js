//index.js
//获取应用实例  
var app = getApp()  
Page( {  
  data: {    
    // tab切换   
    tabArr: {  
      curHdIndex: 0,  
      curBdIndex: 0  
    },
    first:{
      f1:"../../image/icon_4.png",
    }  
  }, 

  click1:function(event){
    //console.log(event);
    for(var i in this.data.first){
      if(i==event.target.dataset.name&&this.data.first[i]=="../../image/icon_4.png"){
        this.data.first[i]="../../image/five_pink.png";
        // if(this.data.first[i]=="../../image/icon_4.png"){
        //   this.data.first[i]=="../../image/five_pink.png";
        // }
        // if(this.data.first[i]=="../../image/five_pink.png"){
        //   this.data.first[i]=="../../image/icon_4.png";
        // }
      }else{
        this.data.first[i]="../../image/icon_4.png";
      }
      // if(i==event.target.dataset.name&&this.data.first[i]=="../../image/five_pink.png"){
      //   this.data.first[i]="../../image/icon_4.png";
      // }
    }
      // if(f1=="../../image/icon_4.png"){
      //   f1=="../../image/five_pink.png";
      // }
      // if(f1=="../../image/five_pink.png"){
      //   f1=="../../image/icon_4.png";
      // }
   //console.log(event.target.dataset.name.substring(1,2));
    this.setData({
      first:this.data.first,
      first_star:event.target.dataset.name.substring(1,2)
    });
  },
  


 tabGoods:function(e){
   var _datasetId=e.target.dataset.id;
   //console.log("----"+_datasetId+"----");  
   var _obj={};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr:_obj
    })
 },
   bindChange: function( e ) {  
    var that = this;  
     //console.log("----"+e.detail.current+"----");  
     var _datasetId=e.detail.current; 
     var _obj={};
    _obj.curHdIndex = _datasetId;
    _obj.curBdIndex = _datasetId;
    this.setData({
      tabArr:_obj
    }) 
  },  



  //加入购物车
  add_cart:function(event){

    var goods_id=event.currentTarget.dataset.goods_id;
    console.log(event);

    if(wx.getStorageSync('account')){

      if(goods_id){
      
        wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/add_cart',
        data: {
          goods_id:goods_id,
        },
        method: 'GET',
        header: {
          'Cookie' : wx.getStorageSync('account'),
        }, // 设置请求的 header
        success: function(res){
          wx.showToast({
              title: res.data.message,
              icon: 'success',
              duration: 1500
          })
        }
      })
   }else{
       wx.showToast({
          title: "添加失败",
          icon: 'success',
          duration: 1500
      })
     
   }

    }else{
       wx.showToast({
          title: "未登录",
          icon: 'success',
          duration: 1500
      })
    
      // var s_cart=wx.getStorageSync('cart');
      // if(s_cart){
      //   var in_s_cart=false;
      //   for(var i in s_cart){
      //     if(s_cart[i]["goods_id"]==goods_id){
      //       //console.log("true");
      //       s_cart[i]["num"]=parseInt(s_cart[i]['num'])+1;
      //       in_s_cart=true;
      //       break;
      //     }
      //   }
      //   if(!in_s_cart){
      //     var add_goods=new Array();
      //     add_goods={
      //       goods_id:goods_id,
      //       content:this.data.goods.name,
      //       price:this.data.goods.price,
      //       discount_price:this.data.goods.discount_price,
      //       num:1,
      //       display_img:{
      //         0:this.data.goods.display_img[0],
      //         1:this.data.goods.display_img[1],
      //         2:this.data.goods.display_img[2],
      //       },
      //       checked:""
      //     };
      //     s_cart.push(add_goods);
      //     wx.showToast({
      //       title: '添加购物车成功',
      //       icon: 'success',
      //       duration: 1500
      //     })
      //   }else{
      //     wx.showToast({
      //       title: '增加购物车成功',
      //       icon: 'success',
      //       duration: 1500
      //     })
      //   }
      //   wx.setStorageSync('cart', s_cart);
      // }else{
      //   var cart=new Array();
      //   cart[0]={
      //     goods_id:goods_id,
      //     content:this.data.goods.name,
      //     price:this.data.goods.price,
      //     discount_price:this.data.goods.discount_price,
      //     num:1,
      //     display_img:{
      //       0:this.data.goods.display_img[0],
      //       1:this.data.goods.display_img[1],
      //       2:this.data.goods.display_img[2],
      //     },
      //     checked:""
      //   };
      //   wx.setStorageSync('cart', cart);
      //   wx.showToast({
      //       title: '添加购物车成功',
      //       icon: 'success',
      //       duration: 1500
      //   })
      // }
      //console.log(wx.getStorageSync('cart'));
    }
  },

  //收藏
    collection:function(event){
    var that=this;
    if(wx.getStorageSync('account')){
      console.log(this.data);


for(var i in this.data.first){
      if(i==event.target.dataset.name&&this.data.first[i]=="../../image/icon_4.png"){
        this.data.first[i]="../../image/five_pink.png";
  
      }else{
        this.data.first[i]="../../image/icon_4.png";
      
      }

    }
     
    this.setData({
      first:this.data.first,
      first_star:event.target.dataset.name.substring(1,2)
    });


      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/collection',
        data: {
          goods_id:that.data.goods.goods_id,
        },
        method: 'GET', 
        header: {
          'Cookie' : wx.getStorageSync('account'),
        }, // 设置请求的 header
        success: function(res){
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500
          })
        }
      })
    }else{
      wx.showToast({
          title: "未登录",
          icon: 'success',
          duration: 1500
      })
    }
  },

  //单品下单
  orderdetail:function(){
    var that=this;
    if(wx.getStorageSync('account')){
      var goods=that.data.goods;
      var add_price=that.data.goods["discount_price"];
      var discount=that.data.goods["price"]-that.data.goods["discount_price"];
      var order_goods=new Object();
      order_goods[0]=goods;
        app.order_goods=order_goods;
        app.order_add_price=add_price;
        app.order_discount=discount;
        wx.navigateTo({
          url: '../../pages/confirm_order/confirm_order?type=one_new_order'
        })
    }else{
      wx.showToast({
          title: "未登录",
          icon: 'success',
          duration: 1500
      })
    }
    //console.log("order");
  },

  //团购下单
  orderdetail_group:function(){
    var that=this;
    if(wx.getStorageSync('account')){
      var goods=that.data.goods;
      var add_price=that.data.goods["group_price"];
      var discount=that.data.goods["price"]-that.data.goods["group_price"];
      var order_goods=new Object();
      order_goods[0]=goods;
        app.order_goods=order_goods;
        app.order_add_price=add_price;
        app.order_discount=discount;
      
        wx.navigateTo({
          url: '../../pages/confirm_order_group/confirm_order_group?type=one_new_order'
        })
    }else{
      wx.showToast({
          title: "未登录",
          icon: 'success',
          duration: 1500
      })
    }
    //console.log("order");
  },

  onLoad: function(option) {  
    wx.setNavigationBarTitle({
      title: '商品详情',
      success: function(res) {
        // success
      }
    })
    var that=this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/goods_detail',
      data: {
        goods_id:option.goods_id
      },
      method: 'GET', 
      success: function(res){
        //console.log(res.data.goods["goods_detail"]);
        var goods=res.data.goods;
        goods["display_img"]=JSON.parse(goods["display_img"]);
        goods["introduce_img"]=JSON.parse(goods["introduce_img"]);
        goods["goods_detail"]=JSON.parse(goods["goods_detail"]);
        var evaluate=res.data.goods_evaluate;
              
        var youhui=toDecimal(goods.discount_price-goods.group_price);//
        
        that.setData({
          goods:goods,
          evaluate:evaluate,
          youhui:youhui,
        })
        wx.request({
          url: 'https://www.gaoliuxu.com/index.php/Home/Index/goods_get_coupon',
          data: {
            goods_id:goods["goods_id"],
          },
          method: 'GET', 
          success: function(re){
            if(re.data.errorcode==0){
              that.setData({
                coupon:re.data.data,
              });
            }
          }
        }),    
         wx.request({  //等待组团购物的请求
          url: 'https://www.gaoliuxu.com/index.php/Home/Index/wait_goods',
         data: {
           goods_id:option.goods_id
          },
          method: 'GET', 
          success: function(re){
            var waitArr =re.data; 
            console.log(waitArr);
            if(waitArr.errorcode==0){

                for(var i in  re.data.data){
            waitArr.data[i]["consignee_phone"]=waitArr.data[i]["consignee_phone"].substr(0, 3) + '*****' + waitArr.data[i]["consignee_phone"].substr(8);  
            waitArr.data[i]["finally_time"]=countdown(this, waitArr.data[i]["order_time"])  ;            
            }
            //console.log(waitArr.data);
             that.setData({
                waitGoods:waitArr.data,
               
              });
            
            }
           
          }
        }),

        wx.request({  //查看商品是否被收藏
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/collection_By_GoodsId',
      data: {
        goods_id:option.goods_id,
      },
      method: 'GET',
      header: {
        'Cookie' : wx.getStorageSync('account'),
      }, // 设置请求的 header
      success: function(res){
        
        if(res.data.errorcode==0){
          that.setData({
              first:{
                  f1:"../../image/five_pink.png",
               }              
         });
          
        }else{
           that.setData({
              first:{
                  f1:"../../image/icon_4.png",
               }              
         });
        }
        
      }
    }) 


      }
    })
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
       if (wait_time <= 0) {  
           
         return "拼团结束";  
       }else{
         return dateformat(wait_time)
       }    
         
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

//保留两位小数点
function toDecimal(x) {       
   var f = parseFloat(x);        
   if (isNaN(f)) {
     return;        
   }        
   f = Math.round(x*100)/100;        
   return f;      
 } 