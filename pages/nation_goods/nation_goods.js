/*newjs*/
// pages/nation_goods/nation_goods.js
Page({
  data:{
    selled_order:0,
    IMGURL:"https://www.gaoliuxu.com/Public/Icon/",
    pricep:"1",
    pricep_img:"price",
    sell_img:"",
    sx_img:"1",
    sx:"none",
    goods_display:"block",
    select:[],
    selected_brand:[],
    selected_style:[],
    selected_function:[],
    selected_price:[],
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
      brand:"block",
      style:"none",
      'function':"none",
      price:"none",
    },
    xuanzhe:{
      brand:"",
      style:"",
     'function':"",
      price:"",
    }
  },

   // 价格排序
  show_price:function(){
    var that=this;
    if(this.data.pricep=="1"){
      //2 为降序
      this.data.pricep="2";
      this.data.pricep_img="price_low";
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:3,
          brand:that.data.selected_brand,
          'function':that.data.selected_function,
          style:that.data.selected_style,
          nation:that.data.nation,
          price:that.data.selected_price,
          price_order:'desc',
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
    }else if(this.data.pricep=="2"){
      //3 为升序
      this.data.pricep="3";
      this.data.pricep_img="price_high";
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:3,
          brand:that.data.selected_brand,
          'function':that.data.selected_function,
          style:that.data.selected_style,
          nation:that.data.nation,
          price:that.data.selected_price,
          price_order:'asc',
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
    }else{
      //1 为无序
      this.data.pricep="1";
      this.data.pricep_img="price";
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:3,
          brand:that.data.selected_brand,
          'function':that.data.selected_function,
          style:that.data.selected_style,
          nation:that.data.nation,
          price:that.data.selected_price,
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
    this.setData({
      pricep:this.data.pricep,
      pricep_img:this.data.pricep_img,
    })
  },

  //销量排序
  sell_order:function(){
    var that=this;
    //降序
    if(this.data.selled_order==0){
      this.data.sell_img="sell1";
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:3,
          brand:that.data.selected_brand,
          'function':that.data.selected_function,
          style:that.data.selected_style,
          nation:that.data.nation,
          price:that.data.selected_price,
          selled_order:'desc',
        },
        method: 'GET', 
        success: function(res){
          var goods=res.data.data;
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods,
            selled_order:1
          });
        }
      })
    //升序
    }else{
      this.data.sell_img="sell2";
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:3,
          brand:that.data.selected_brand,
          'function':that.data.selected_function,
          style:that.data.selected_style,
          nation:that.data.nation,
          price:that.data.selected_price,
          selled_order:'asc',
        },
        method: 'GET', 
        success: function(res){
          var goods=res.data.data;
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods,
            selled_order:0
          });
        }
      })
    }
    this.setData({
      sell_img:this.data.sell_img,
    })
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

    if( this.data.selected_brand){  //品牌子类选择不为空

          for(var i in this.data.xuanzhe){
          if(i=='brand'){
            if(this.data.selected_brand.length!='0'){
                this.data.xuanzhe[i]="xuanzhe";
            }else{
                 this.data.xuanzhe[i]="";   
            }
          
          }
        }
        this.setData({
        xuanzhe:this.data.xuanzhe,
        })    
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
    
    if( this.data.selected_function){  //功效子类选择不为空

          for(var i in this.data.xuanzhe){
          if(i=='function'){
            if(this.data.selected_function.length!='0'){
                this.data.xuanzhe[i]="xuanzhe";
            }else{
                 this.data.xuanzhe[i]="";   
            }
           
          }
        }
        this.setData({
        xuanzhe:this.data.xuanzhe,
        })    
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
    
    if( this.data.selected_style){  //分类子类选择不为空

          for(var i in this.data.xuanzhe){

          if(i=='style'){
            if(this.data.selected_style.length!='0'){
                this.data.xuanzhe[i]="xuanzhe";
            }else{
                 this.data.xuanzhe[i]="";   
            }
           
          }
        }
        this.setData({
        xuanzhe:this.data.xuanzhe,
        })    
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
    //  var ind;
    //  var selected_function=this.data.selected_function;
    //  var in_fc;
    //  var sf=[];
    //  for(var i in selected_function){
    //    for(var k in fc){
    //      if(selected_function[i]==fc[k]["name"]){
    //        fc[k]["show"]="block";
    //        in_fc=true;
    //        break;
    //      }else{
    //        in_fc=false;
    //        this.data.select.splice(this.data.select.indexOf(selected_function[i]),1);
    //      }
    //    }
    //    if(in_fc){
    //      sf[i]=selected_function[i];
    //    }
       
    //  }
    // console.log(sf);
    // console.log(fc);
    this.setData({
        'function':fc,
    });
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

   if( this.data.selected_price){  //价格子类选择不为空

          for(var i in this.data.xuanzhe){
          if(i=='price'){
            if(this.data.selected_price.length!='0'){
                this.data.xuanzhe[i]="xuanzhe";
            }else{
                 this.data.xuanzhe[i]="";   
            }
          
          }
        }
        this.setData({
        xuanzhe:this.data.xuanzhe,
        })    
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

      if( this.data.selected_brand){  //品牌子类选择不为空

          for(var i in this.data.xuanzhe){
          if(i=='brand'){
            if(this.data.selected_brand.length!='0'){
                this.data.xuanzhe[i]="xuanzhe";
            }else{
                 this.data.xuanzhe[i]="";   
            }
          
          }
        }
        this.setData({
        xuanzhe:this.data.xuanzhe,
        })    
    }

    }else if(index==1){
      this.data.style[inde]["show"]="none";
      this.data.selected_style.splice(this.data.selected_style.indexOf(event.target.dataset.name),1);

      if( this.data.selected_style){  //分类子类选择不为空

          for(var i in this.data.xuanzhe){
          if(i=='style'){
            if(this.data.selected_style.length!='0'){
                this.data.xuanzhe[i]="xuanzhe";
            }else{
                 this.data.xuanzhe[i]="";   
            }
          
          }
        }
        this.setData({
        xuanzhe:this.data.xuanzhe,
        })    
    }

    }else if(index==2){
      this.data.function[inde]["show"]="none";
      this.data.selected_function.splice(this.data.selected_function.indexOf(event.target.dataset.name),1);

  if( this.data.selected_function){  //功效子类选择不为空

          for(var i in this.data.xuanzhe){
          if(i=='function'){
            if(this.data.selected_function.length!='0'){
                this.data.xuanzhe[i]="xuanzhe";
            }else{
                 this.data.xuanzhe[i]="";   
            }
          
          }
        }
        this.setData({
        xuanzhe:this.data.xuanzhe,
        })    
    }

    }else if(index==3){
      this.data.price[inde]["show"]="none";
      this.data.selected_price.splice(this.data.selected_price.indexOf(event.target.dataset.name),1);

    if( this.data.selected_price){  //价格子类选择不为空

          for(var i in this.data.xuanzhe){
          if(i=='price'){
            if(this.data.selected_price.length!='0'){
                this.data.xuanzhe[i]="xuanzhe";
            }else{
                 this.data.xuanzhe[i]="";   
            }
          
          }
        }
        this.setData({
        xuanzhe:this.data.xuanzhe,
        })    
    }

    }


    this.setData({
      select:this.data.select,
      brand:this.data.brand,
      style:this.data.style,
      'function':this.data.function,
      price:this.data.price,
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
        brand:that.data.selected_brand,
        'function':that.data.selected_function,
        style:that.data.selected_style,
        nation:that.data.nation,
        price:that.data.selected_price,
      },
      method: 'GET', 
      success: function(res){
        var goods=res.data.data;
        for(var i in goods){
          goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
        }
        that.setData({
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

    for(var i in this.data.xuanzhe){
           this.data.xuanzhe[i]="";    
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
      brand:this.data.brand,
      style:this.data.style,
      'function':this.data.function,
      price:this.data.price,
      xuanzhe:this.data.xuanzhe,
    })
    console.log(this.data);
  },
  all:function(e){
    var dc=e.target.dataset.id;
    console.log(dc);
    this.setData({
      selected_nav:dc
    })
  },
  onLoad:function(options){
    wx.setNavigationBarTitle({
      title: options.name
    })
    var that=this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/nation_goods',
      data: {
        nation:options.name,
      },
      method: 'GET', 
      success: function(res){
        //console.log(res);
        if(res.data.errorcode==0){
          var goods=res.data.data
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          var nation={};
          nation[0]=options.name;
          that.setData({
            title:options.name,
            goods:goods,
            nation:nation,
          });
        }
      }
    })
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_all_nation_style',
      data: {
        nation:options.name
      },
      method: 'GET', 
      success: function(res){
        that.setData({
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