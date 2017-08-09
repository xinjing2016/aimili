//index.js
//获取应用实例
var app = getApp()
Page({
   data: {
     add_price:0,
     discount:0,
     select_all:0,
     quanxuan:"../../image/addaddress_12.png",
     first:{
      f1:"../../image/addaddress_12.png",
      f2:"../../image/addaddress_03.png",
    }
  },

  onShow:function(){
    this.onLoad();
    // var that=this;
    // wx.request({
    //   url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_cart',
    //   data: {},
    //   method: 'GET', 
    //   header: {
    //     'Cookie' : wx.getStorageSync('account'),
    //   }, // 设置请求的 header
    //   success: function(res){
    //     var cart=res.data.data;
    //     for(var i in cart){
    //       cart[i]["display_img"]=JSON.parse(cart[i]["display_img"]);
    //     }
    //     that.setData({
    //       goods:cart
    //     });
    //   }
    // })
  },

  //全选
  select_all:function(){
    var add_price=0;
    var discount=0;
    var quanxuan='';
    if(this.data.select_all==0){
      for(var i in this.data.goods){
        this.data.goods[i]["checked"]="true";
        add_price=add_price+(parseFloat(this.data.goods[i]["discount_price"])*this.data.goods[i]["num"]);
        discount=discount+((parseFloat(this.data.goods[i]["price"])-parseFloat(this.data.goods[i]["discount_price"]))*parseFloat(this.data.goods[i]["num"]));

        this.data.goods[i]["gouxuan"]="../../image/addaddress_03.png";
        quanxuan="../../image/addaddress_03.png";
      }
      this.data.select_all=1;
    }else{
      for(var i in this.data.goods){
        this.data.goods[i]["checked"]="";
        this.data.goods[i]["gouxuan"]="../../image/addaddress_12.png";
          quanxuan="../../image/addaddress_12.png";
      }
      console.log(quanxuan);
      this.data.select_all=0;
    }
    //console.log(this.data.goods);
    this.setData({
      select_all:this.data.select_all,
      goods:this.data.goods,
      add_price:toDecimal(add_price),
      discount:toDecimal(discount),
      quanxuan:quanxuan,
    })
  },

  //选钩
  change:function(event){
    var add_price=0;
    var discount=0;
    var checked=event.detail.value;
    console.log(checked);
    console.log(this.data.goods);
    for(var j=0;j<checked.length;j++){
      for(var i in this.data.goods){
        if(this.data.goods[checked[j]]==this.data.goods[i]){
          this.data.goods[i]["checked"]="true";         
          add_price=add_price+(parseFloat(this.data.goods[i]["discount_price"])*parseFloat(this.data.goods[i]["num"]));
          discount=discount+(parseFloat(this.data.goods[i]["price"])-parseFloat(this.data.goods[i]["discount_price"]))*parseFloat(this.data.goods[i]["num"]);

 this.data.goods[i]["gouxuan"]="../../image/addaddress_03.png";
        }
      }
    }
    for(i in this.data.goods){
      if(checked.indexOf(i)==-1){
        this.data.goods[i]["checked"]="";
        this.data.goods[i]["gouxuan"]="../../image/addaddress_12.png";
      }
    }
    this.setData({
        add_price:toDecimal(add_price),
        discount:toDecimal(discount),
        goods:this.data.goods,
    })
  },

  //增加数量
  increase:function(event){
    var that=this;
    var index=event.target.dataset.index;
    this.data.goods[index]["num"]=parseFloat(this.data.goods[index]["num"])+1;
    if(this.data.goods[index]["checked"].length>=2){
      this.data.add_price=this.data.add_price+parseFloat(this.data.goods[index]["discount_price"]);
      this.data.discount=this.data.discount+(parseFloat(this.data.goods[index]["price"])-parseFloat(this.data.goods[index]["discount_price"]));
    }
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/modify_cart',
      data: {
        goods_id:that.data.goods[index]["goods_id"],
        num:that.data.goods[index]["num"],
      },
      method: 'GET', 
      header: {
        'Cookie' : wx.getStorageSync('account'),
      }, // 设置请求的 header
      success: function(res){
        if(res.data.errorcode==0){
          that.setData({
            goods:that.data.goods,
            add_price:toDecimal(that.data.add_price),
            discount:toDecimal(that.data.discount),
          })
        }
      }
    })
    
  },

  //减少数量
  decrease:function(event){
    var that=this;
    var index=event.target.dataset.index;
    if(this.data.goods[index]["num"]>1){
      this.data.goods[index]["num"]=parseFloat(this.data.goods[index]["num"])-1;
      if(this.data.goods[index]["checked"].length>=2){
        this.data.add_price=this.data.add_price-parseFloat(this.data.goods[index]["discount_price"]);
        this.data.discount=this.data.discount-(parseFloat(this.data.goods[index]["price"])-parseFloat(this.data.goods[index]["discount_price"]));
      }
      wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/modify_cart',
      data: {
        goods_id:that.data.goods[index]["goods_id"],
        num:that.data.goods[index]["num"],
      },
      method: 'GET', 
      header: {
        'Cookie' : wx.getStorageSync('account'),
      }, // 设置请求的 header
      success: function(res){
        if(res.data.errorcode==0){
          that.setData({
            goods:that.data.goods,
            add_price:toDecimal(that.data.add_price),
            discount:toDecimal(that.data.discount),
          })
        }
      }
    })
    }else{
      wx.showModal({
      title: '提示',
      content: '是否将商品移出购物车？',
      success: function(res) {
        if (res.confirm) {
          //服务器请求删除数据
          wx.request({
            url: 'https://www.gaoliuxu.com/index.php/Home/Index/delete_cart',
            data: {
              goods_id:that.data.goods[index]["goods_id"],
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
                var ne=new Object();
                var add_price=0;
                var discount=0;
                var goods=that.data.goods;
                for(var i in goods){
                  if(i!=index){
                    ne[i]=goods[i];
                    if(ne[i]["checked"].length>2){
                      add_price=add_price+ne[i]["discount_price"]*ne[i]["num"];
                      discount=discount+(ne[i]["price"]-ne[i]["discount_price"])*ne[i]["num"];
                    }
                  }
                }
                that.setData({
                  goods:ne,
                  add_price:add_price,
                  discount:discount,
                })
              }else{
                wx.showToast({
                  title: res.data.message,
                  icon: 'success',
                  duration: 1500
                })
              }
            }
          })    
        }
      }
      })
    } 
  },


  //结算
  submit:function(){
    var that=this;
    var index=0;//'{"":""}'
    var start='{';
    var end='}';
    var str='';
    var goods=new Object;
    for(var i in this.data.goods){
      if(this.data.goods[i]["checked"].length>=2){
        goods[index]=this.data.goods[i];
        index++;
      } 
    }
    if(JSON.stringify(goods).length>4){
      // wx.request({
      //   url: 'https://www.gaoliuxu.com/index.php/Home/Index/new_order_one',
      //   data: {
      //     goods:goods,
      //     add_price:this.data.add_price,
      //     discount:this.data.discount,
      //   },
      //   method: 'GET',
      //   header:{
      //     'Cookie' : wx.getStorageSync('account'),
      //   },
      //   success: function(res){
      //     console.log(res);
      //   },
      // })
      app.order_goods=goods;
      app.order_add_price=that.data.add_price;
      app.order_discount=that.data.discount;
      wx.navigateTo({
        url: '../../pages/confirm_order/confirm_order'
      })
    }else{
      wx.showToast({
        title: "未选择商品",
        icon: 'success',
        duration: 1500
      })
    }
    
  },

  onLoad: function () {
    var that=this;
    wx.setNavigationBarTitle({
      title: "购物车",
    })
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_cart',
      data: {},
      method: 'GET', 
      header: {
        'Cookie' : wx.getStorageSync('account'),
      }, // 设置请求的 header
      success: function(res){
        var cart=res.data.data;
        for(var i in cart){
          cart[i]["display_img"]=JSON.parse(cart[i]["display_img"]);
          cart[i]["gouxuan"]="../../image/addaddress_12.png";
        }
        console.log(cart);
        that.setData({
         goods:cart
        });
        // var s_c=wx.getStorageSync('cart');
        // if(res.data.errorcode==0){
        //   if(s_c){
        //     for(var i in s_c){
        //       cart.push(s_c[i]);
        //     }
        //     that.setData({
        //       goods:cart,
        //     });
        //   }
        // }else{
        //   that.setData({
        //     goods:s_c,
        //   });
        // }
        
      }
    })
  },

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