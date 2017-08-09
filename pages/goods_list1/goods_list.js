// pages/nation_goods/nation_goods.js
Page({
  data:{
    selled_order:0,
    pricep:"1",
    pricep_img:"price",
    sx_img:"1",
    sx:"none",
    goods_display:"block",
    select:[],
    selected_brand:[],
    selected_style:[],
    selected_function:[],
    selected_price:[],
    selected_nation:[],
    brand:{
      "0":{
        name:"brand0",
        show:"none",
      },
    },
    style:{
      "0":{
        name:"style",
        show:"none"
      },
    },
    'function':{
      "0":{
        name:"function0",
        show:"none"
      },
    },
    price:{
      "0":{
        name:"0-199",
        show:"none"
      },
    },
    model:{
      nation:"block",
      brand:"none",
      style:"none",
      'function':"none",
      price:"none",
    }
  },

   // 价格排序
  show_price:function(){
    var that=this;
    var price_order;
    if(this.data.pricep=="1"){
      //2 为降序
      this.data.pricep="2";
      this.data.pricep_img="price_low";
      price_order="desc";
    }else if(this.data.pricep=="2"){
      //3 为升序
      this.data.pricep="3";
      this.data.pricep_img="price_high";   
      price_order="asc";   
    }else{
      //1 为无序
      this.data.pricep="1";
      this.data.pricep_img="price";
      price_order="";
    }
    this.setData({
      pricep:this.data.pricep,
      pricep_img:this.data.pricep_img,
    })
    if(this.data.page==1){
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:1,
          'type':that.data.type,
          keyword:that.data.keyword,
          price_order:price_order,
        },
        method: 'GET', 
        success: function(res){
          var goods=res.data.data
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods,
          });
        }
      })
    }else if(this.data.page==2){
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:2,
          key:that.data.key,
          keyword:that.data.keyword,
          price_order:price_order,
        },
        method: 'GET', 
        success: function(res){
          var goods=res.data.data
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods,
          });
        }
      })
    }else if(this.data.page==3){
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:3,
          nation:that.data.selected_nation,
          brand:that.data.selected_brand,
          'function':that.data.selected_function,
          style:that.data.selected_style,
          price:that.data.selected_price,
          price_order:price_order,
        },
        method: 'GET', 
        success: function(res){
          var goods=res.data.data;
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods,
          });
        }
      })
    }
  },

  //销量排序
  sell_order:function(){
    var that=this;
    var selled_order;
    //降序
    if(this.data.selled_order==0){
      selled_order="desc";
      that.setData({
        selled_order:1,
      });
    //升序
    }else{
      selled_order="asc";
      that.setData({
        selled_order:0,
      });
    }
    if(this.data.page==1){
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:1,
          'type':that.data.type,
          keyword:that.data.keyword,
          selled_order:selled_order,
        },
        method: 'GET', 
        success: function(res){
          var goods=res.data.data
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods,
          });
        }
      })
    }else if(this.data.page==2){
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:2,
          key:that.data.key,
          keyword:that.data.keyword,
          selled_order:selled_order,
        },
        method: 'GET', 
        success: function(res){
          var goods=res.data.data
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods,
          });
        }
      })
    }else if(this.data.page==3){
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:3,
          nation:that.data.selected_nation,
          brand:that.data.selected_brand,
          'function':that.data.selected_function,
          style:that.data.selected_style,
          price:that.data.selected_price,
          selled_order:selled_order,
        },
        method: 'GET', 
        success: function(res){
          var goods=res.data.data;
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods,
          });
        }
      })
    }
  },

  //显示筛选内容
  show_sx:function(){
    if(this.data.sx=="none"){
      this.data.sx="block";
      this.data.goods_display="none";
      this.data.sx_img="2";
    }else{
      this.data.sx="none";
      this.data.goods_display="block";
      this.data.sx_img="1";
    }
    this.setData({
      sx:this.data.sx,
      sx_img:this.data.sx_img,
      goods_display:this.data.goods_display,
    });
  },

  //选择国家馆
  nation:function(event){
    var nationid=event.target.dataset.nationid;
    var index=this.data.select.indexOf(this.data.nation[nationid]["name"]);
    if(index==-1){
      this.data.select.push(this.data.nation[nationid]["name"]);
      this.data.nation[nationid]["show"]="block";
      this.data.selected_nation.push(this.data.nation[nationid]["name"]);
    }else{
      this.data.select.splice(index, 1);
      this.data.nation[nationid]["show"]="none";
      var j=this.data.selected_nation.indexOf(this.data.nation[nationid]["name"]);
      this.data.selected_nation.splice(j,1);
    }
    this.setData({
      select:this.data.select,
      nation:this.data.nation,
      selected_nation:this.data.selected_nation,
    });
    var nationid;
    var fc=[];
    if(this.data.selected_nation.length>0){
      for(var k in this.data.selected_nation){
        for(var n in this.data.nation){
          if(this.data.selected_nation[k]==this.data.nation[n]["name"]){
            nationid=this.data.nation[n]["id"];
          }
        }
        for(var s in this.data.data_brand){
          if(this.data.data_brand[s]['nation_id']==nationid){
            fc.push(this.data.data_brand[s]);
          }
        }
      }
    }else{
      fc=this.data.data_brand;
    }
    this.setData({
      brand:fc,
    });
  },


  //选择品牌
  brand:function(event){
    var brandid=event.target.dataset.brandid;
    var index=this.data.select.indexOf(this.data.brand[brandid]["name"]);
    if(index==-1){
      this.data.select.push(this.data.brand[brandid]["name"]);
      this.data.brand[brandid]["show"]="block";
      this.data.selected_brand.push(this.data.brand[brandid]["name"]);
    }else{
      this.data.select.splice(index, 1);
      this.data.brand[brandid]["show"]="none";
      var j=this.data.selected_brand.indexOf(this.data.brand[brandid]["name"]);
      this.data.selected_brand.splice(j,1);
    }
    this.setData({
        select:this.data.select,
        brand:this.data.brand,
        selected_brand:this.data.selected_brand,
      });
  },

  //选择功效
  'function':function(event){
    var i=event.target.dataset.functionid;
    var index=this.data.select.indexOf(this.data.function[i]["name"]);
    if(index==-1){
      this.data.select.push(this.data.function[i]["name"]);
      this.data.function[i]["show"]="block";
      this.data.selected_function.push(this.data.function[i]["name"]);
    }else{
      this.data.select.splice(index,1);
      this.data.function[i]["show"]="none";
      var j=this.data.selected_function.indexOf(this.data.function[i]["name"]);
      this.data.selected_function.splice(j,1);
    }
    this.setData({
        select:this.data.select,
        selected_function:this.data.selected_function,
        'function':this.data.function,
      });
  },

  //选择分类
  style:function(event){
    var i=event.target.dataset.styleid;
    var index=this.data.select.indexOf(this.data.style[i]["name"]);
    if(index==-1){
      this.data.select.push(this.data.style[i]["name"]);
      this.data.selected_style.push(this.data.style[i]["name"]);
      this.data.style[i]["show"]="block";
    }else{
      this.data.select.splice(index,1);
      this.data.style[i]["show"]="none";
      var j=this.data.selected_style.indexOf(this.data.style[i]["name"]);
      this.data.selected_style.splice(j,1);
    }
    this.setData({
        select:this.data.select,
        selected_style:this.data.selected_style,
        style:this.data.style,
    });
    var styleid;
    var fc=[];
    if(this.data.selected_style.length>0){
      for(var k in this.data.selected_style){
        for(var n in this.data.style){
          if(this.data.selected_style[k]==this.data.style[n]["name"]){
            styleid=this.data.style[n]["id"];
          }
        }
        for(var s in this.data.data_function){
          if(this.data.data_function[s]['style_id']==styleid){
            fc.push(this.data.data_function[s]);
          }
        }
      }
    }else{
      fc=this.data.data_function;
    }
    //console.log(fc);
    this.setData({
        'function':fc,
    });
  },

  //搜索
  search:function(event){
    var that=this;
    that.setData({
      page:1,
      'type':"search",
      keyword:event.detail.value,
    });
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
      data: {
        page:1,
        'type':"search",
        keyword:event.detail.value,
      },
      method: 'GET', 
      success: function(res){
        var goods=res.data.data
        for(var i in goods){
          goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
        }
        that.setData({
          goods:goods,
        });
      }
    })
  },

  //选择价格
  price:function(event){
    var sl_id;
    var i=event.target.dataset.priceid;
    var index=this.data.select.indexOf(this.data.price[i]["name"]);
    if(index==-1){
      this.data.select.push(this.data.price[i]["name"]);
      this.data.selected_price[0]=this.data.price[i]["name"];
      this.data.price[i]["show"]="block";
      for(var k in this.data.price){
        if(k!=i){
          this.data.price[k]["show"]="none";
          sl_id=this.data.select.indexOf(this.data.price[k]["name"]);
          if(sl_id!=-1){
            this.data.select.splice(sl_id,1);
          }
        }   
      }
    }else{
      this.data.select.splice(index,1);
      this.data.price[i]["show"]="none";
      var j=this.data.selected_price.indexOf(this.data.price[i]["name"]);
      this.data.selected_price.splice(j,1);
    }
    this.setData({
        select:this.data.select,
        selected_price:this.data.selected_price,
        price:this.data.price,
      });
  },

  //删除选择的项
  del_sel:function(event){
    for(var i=0;i<this.data.select.length;i++){
      if(this.data.select[i]==event.target.dataset.name){
        this.data.select.splice(i, 1);
        break;
      }
    }
    var have_find=0;
    var arr;
    var index=-1;
    var inde;
    for(var k=0;k<4;k++){
      if(k==0){
        arr=this.data.brand;
      }else if(k==1){
        arr=this.data.style;
      }else if(k==2){
        arr=this.data.function;
      }else if(k==3){
        arr=this.data.price
      }else if(k==4){
        arr=this.data.nation;
      }
      for(var j in arr){
        if(arr[j]["name"]==event.target.dataset.name){
          index=k;
          inde=j;
          break;
        }
      }
      if(index!=(-1)){
        break;
      }  
    }
    if(index==0){
      this.data.brand[inde]["show"]="none";
      this.data.selected_brand.splice(this.data.selected_brand.indexOf(event.target.dataset.name),1);
    }else if(index==1){
      this.data.style[inde]["show"]="none";
      this.data.selected_style.splice(this.data.selected_style.indexOf(event.target.dataset.name),1);
    }else if(index==2){
      this.data.function[inde]["show"]="none";
      this.data.selected_function.splice(this.data.selected_function.indexOf(event.target.dataset.name),1);
    }else if(index==3){
      this.data.price[inde]["show"]="none";
      this.data.selected_price.splice(this.data.selected_price.indexOf(event.target.dataset.name),1);
    }else if(index==4){
      this.data.nation[inde]["show"]="none";
      this.data.selected_nation.splice(this.data.selected_nation.indexOf(event.target.dataset.name),1);
    }


    this.setData({
      select:this.data.select,
      nation:this.data.nation,
      brand:this.data.brand,
      style:this.data.style,
      'function':this.data.function,
      price:this.data.price,
      selected_nation:this.data.selected_nation,
      selected_brand:this.data.selected_brand,
      selected_style:this.data.selected_style,
      selected_function:this.data.selected_function,
      selected_price:this.data.selected_price,
    })
  },

  //选择大类
  click:function(event){
    //console.log(event);
    for(var i in this.data.model){
      if(i==event.target.dataset.model){
        this.data.model[i]="block";
      }else{
        this.data.model[i]="none";
      }
    }
    this.setData({
      model:this.data.model,
    })
  },

  //确认提交筛选
  query_request:function(){
    this.show_sx();
    var that=this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
      data: {
        page:3,
        nation:that.data.selected_nation,
        brand:that.data.selected_brand,
        'function':that.data.selected_function,
        style:that.data.selected_style,
        price:that.data.selected_price,
      },
      method: 'GET', 
      success: function(res){
        var goods=res.data.data;
        for(var i in goods){
          goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
        }
        that.setData({
          page:3,
          goods:goods,
          pricep:1,
          pricep_img:'price',
        });
      }
    })
  },

  //重置筛选
  re_select:function(){
    for(var i in this.data.brand){
      this.data.brand[i]["show"]="none";
    }
    for(var l in this.data.style){
      this.data.style[l]["show"]="none";
    }
    for(var k in this.data.function){
      this.data.function[k]["show"]="none";
    }
    for(var j in this.data.price){
      this.data.price[j]["show"]="none";
    }
    for(var s in this.data.nation){
      this.data.nation[s]["show"]="none";
    }
    // this.data.select.splice(0,this.data.select.length);
    // this.data.selected_brand.splice(0,this.data.selected_brand.length);
    // this.data.selected_function.splice(0,this.data.selected_function.length);
    // this.data.selected_style.splice(0,this.data.selected_style.length);
    // this.data.selected_price.splice(0,this.data.selected_price.length);
    console.log(this.data);
    this.setData({
      select:[],//this.data.select
      selected_brand:[],//this.data.selected_brand
      selected_function:[],//this.data.selected_function
      selected_style:[],//this.data.selected_style
      selected_price:[],//this.data.selected_price
      selected_nation:[],
      brand:this.data.brand,
      style:this.data.style,
      'function':this.data.function,
      price:this.data.price,
      nation:this.data.nation,
    })
    //console.log(this.data);
  },


  onLoad:function(options){
    //page=1&type=search&keyword=aadd,
    //page=2&key=function&keyword=function1
    //page=2&key=brand&keyword=brand2

    wx.setNavigationBarTitle({
      title: "商品列表"
    })
    var that=this;
    if(options.page==1){
      that.setData({
        page:1,
        'type':options.type,
        keyword:options.keyword,
      });
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:1,
          'type':options.type,
          keyword:options.keyword,
        },
        method: 'GET', 
        success: function(res){
          var goods=res.data.data
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods,
          });
        }
      })
    }else if(options.page==2){
      that.setData({
        page:2,
        key:options.key,
        keyword:options.keyword,
      });
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:2,
          key:options.key,
          keyword:options.keyword,
        },
        method: 'GET', 
        success: function(res){
          var goods=res.data.data
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods,
          });
        }
      })
    }
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_all_style_goods',
      data: {
        
      },
      method: 'GET', 
      success: function(res){
        that.setData({
          nation:res.data.data.nation,
          data_brand:res.data.data.brand,
          brand:res.data.data.brand,
          style:res.data.data.style,
          data_function:res.data.data.function,
          'function':res.data.data.function,
          price:res.data.data.price,
        })
      }
    })
  },

})