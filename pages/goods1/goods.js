//index.js
//获取应用实例  
var app = getApp()  
Page( {  
  data: {    
    // tab切换   
    tabArr: {  
      curHdIndex: 0,  
      curBdIndex: 0  
    }  
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
    var goods_id=event.target.dataset.goods_id;
    if(wx.getStorageSync('account')){
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
      
    }
  },

  //收藏
  collection:function(){
    var that=this;
    if(wx.getStorageSync('account')){
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
        that.setData({
          goods:goods,
          evaluate:evaluate,
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
        })
      }
    })
  },  
  
})  