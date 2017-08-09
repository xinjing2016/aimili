// pages/classify/classify.js
Page({
  data:{
    pricep:"1",
    pricep_img:"price",
    sx_img:"1",
    sx:"none",
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
      "1":{
        name:"brand1",
        show:"none",
      },
      "2":{
        name:"brand2",
        show:"none",
      },
      "3":{
        name:"brand3",
        show:"none",
      },
      "4":{
        name:"brand4",
        show:"none",
      },
      "5":{
        name:"brand5",
        show:"none",
      },
      "6":{
        name:"brand6",
        show:"none",
      },
      "7":{
        name:"brand7",
        show:"none",
      },
      "8":{
        name:"brand8",
        show:"none",
      },
      "9":{
        name:"brand9",
        show:"none",
      },
    },
    style:{
      "0":{
        name:"style",
        show:"none"
      },
      "1":{
        name:"style1",
        show:"none"
      },
      "2":{
        name:"style2",
        show:"none"
      },
      "3":{
        name:"style3",
        show:"none"
      },
      "4":{
        name:"style4",
        show:"none"
      },
      "5":{
        name:"style5",
        show:"none"
      },
      "6":{
        name:"style6",
        show:"none"
      },
      "7":{
        name:"style7",
        show:"none"
      },
      "8":{
        name:"style8",
        show:"none"
      },
    },
    'function':{
      "0":{
        name:"function0",
        show:"none"
      },
      "1":{
        name:"function1",
        show:"none"
      },
      "2":{
        name:"function2",
        show:"none"
      },
      "3":{
        name:"function3",
        show:"none"
      },
      "4":{
        name:"function4",
        show:"none"
      },
      "5":{
        name:"function5",
        show:"none"
      },
      "6":{
        name:"function6",
        show:"none"
      },
      "7":{
        name:"function7",
        show:"none"
      },
      "8":{
        name:"function8",
        show:"none"
      },
      "9":{
        name:"function9",
        show:"none"
      },
      "10":{
        name:"function10",
        show:"none"
      },"11":{
        name:"function11",
        show:"none"
      },
    },
    price:{
      "0":{
        name:"0-199",
        show:"none"
      },
      "1":{
        name:"199-299",
        show:"none"
      },
      "2":{
        name:"299-399",
        show:"none"
      },
      "3":{
        name:"399-499",
        show:"none"
      },
      "4":{
        name:"499-599",
        show:"none"
      },
      "5":{
        name:"599-799",
        show:"none"
      },
    },
    model:{
      brand:"block",
      style:"none",
      'function':"none",
      price:"none",
    }
  },

  // 价格排序
  show_price:function(){
    if(this.data.pricep=="1"){
      //2 为降序
      this.data.pricep="2";
      this.data.pricep_img="price_low";
    }else if(this.data.pricep=="2"){
      //3 为升序
      this.data.pricep="3";
      this.data.pricep_img="price_high";
    }else{
      //1 为无序
      this.data.pricep="1";
      this.data.pricep_img="price";
    }
    this.setData({
      pricep:this.data.pricep,
      pricep_img:this.data.pricep_img,
    })
  },

  //显示筛选内容
  show_sx:function(){
    if(this.data.sx=="none"){
      this.data.sx="block";
      this.data.sx_img="2";
    }else{
      this.data.sx="none";
      this.data.sx_img="1";
    }
    this.setData({
      sx:this.data.sx,
      sx_img:this.data.sx_img,
    });
  },

  // //选择品牌
  // brand:function(event){
  //   var i=event.target.dataset.brandid;
  //   var index=this.data.select.indexOf(this.data.brand[i]["name"]);
  //   if(index==-1){
  //     this.data.select.push(this.data.brand[i]["name"]);
  //     this.data.brand[i]["show"]="block";
  //     this.data.selected_brand.push(this.data.brand[i]["name"]);
  //   }else{
  //     this.data.select.splice(index, 1);
  //     this.data.brand[i]["show"]="none";
  //     var j=this.data.selected_brand.indexOf(this.data.brand[i]["name"]);
  //     this.data.selected_brand.splice(j,1);
  //   }
  //   this.setData({
  //       select:this.data.select,
  //       brand:this.data.brand,
  //       selected_brand:this.data.selected_brand,
  //     });
  // },

  // //选择功效
  // 'function':function(event){
  //   var i=event.target.dataset.functionid;
  //   var index=this.data.select.indexOf(this.data.function[i]["name"]);
  //   if(index==-1){
  //     this.data.select.push(this.data.function[i]["name"]);
  //     this.data.function[i]["show"]="block";
  //     this.data.selected_function.push(this.data.function[i]["name"]);
  //   }else{
  //     this.data.select.splice(index,1);
  //     this.data.function[i]["show"]="none";
  //     var j=this.data.selected_function.indexOf(this.data.function[i]["name"]);
  //     this.data.selected_function.splice(j,1);
  //   }
  //   this.setData({
  //       select:this.data.select,
  //       selected_function:this.data.selected_function,
  //       'function':this.data.function,
  //     });
  // },

  // //选择分类
  // style:function(event){
  //   var i=event.target.dataset.styleid;
  //   var index=this.data.select.indexOf(this.data.style[i]["name"]);
  //   if(index==-1){
  //     this.data.select.push(this.data.style[i]["name"]);
  //     this.data.selected_style.push(this.data.style[i]["name"]);
  //     this.data.style[i]["show"]="block";
  //   }else{
  //     this.data.select.splice(index,1);
  //     this.data.style[i]["show"]="none";
  //     var j=this.data.selected_style.indexOf(this.data.style[i]["name"]);
  //     this.data.selected_style.splice(j,1);
  //   }
  //   this.setData({
  //       select:this.data.select,
  //       selected_style:this.data.selected_style,
  //       style:this.data.style,
  //     });
  // },

  // //选择价格
  // price:function(event){
  //   var i=event.target.dataset.priceid;
  //   var index=this.data.select.indexOf(this.data.price[i]["name"]);
  //   if(index==-1){
  //     this.data.select.push(this.data.price[i]["name"]);
  //     this.data.selected_price.push(this.data.price[i]["name"]);
  //     this.data.price[i]["show"]="block";
  //   }else{
  //     this.data.select.splice(index,1);
  //     this.data.price[i]["show"]="none";
  //     var j=this.data.selected_price.indexOf(this.data.price[i]["name"]);
  //     this.data.selected_price.splice(j,1);
  //   }
  //   this.setData({
  //       select:this.data.select,
  //       selected_price:this.data.selected_price,
  //       price:this.data.price,
  //     });
  // },

  // //删除选择的项
  // del_sel:function(event){
  //   for(var i=0;i<this.data.select.length;i++){
  //     if(this.data.select[i]==event.target.dataset.name){
  //       this.data.select.splice(i, 1);
  //       break;
  //     }
  //   }
  //   var have_find=0;
  //   var arr;
  //   var index=-1;
  //   var inde;
  //   for(var k=0;k<4;k++){
  //     if(k==0){
  //       arr=this.data.brand;
  //     }else if(k==1){
  //       arr=this.data.style;
  //     }else if(k==2){
  //       arr=this.data.function;
  //     }else if(k==3){
  //       arr=this.data.price
  //     }
  //     for(var j in arr){
  //       if(arr[j]["name"]==event.target.dataset.name){
  //         index=k;
  //         inde=j;
  //         break;
  //       }
  //     }
  //     if(index!=(-1)){
  //       break;
  //     }  
  //   }
  //   if(index==0){
  //     this.data.brand[inde]["show"]="none";
  //     this.data.selected_brand.splice(this.data.selected_brand.indexOf(event.target.dataset.name),1);
  //   }else if(index==1){
  //     this.data.style[inde]["show"]="none";
  //     this.data.selected_style.splice(this.data.selected_style.indexOf(event.target.dataset.name),1);
  //   }else if(index==2){
  //     this.data.function[inde]["show"]="none";
  //     this.data.selected_function.splice(this.data.selected_function.indexOf(event.target.dataset.name),1);
  //   }else if(index==3){
  //     this.data.price[inde]["show"]="none";
  //     this.data.selected_price.splice(this.data.selected_price.indexOf(event.target.dataset.name),1);
  //   }


  //   this.setData({
  //     select:this.data.select,
  //     brand:this.data.brand,
  //     style:this.data.style,
  //     'function':this.data.function,
  //     price:this.data.price,
  //     selected_brand:this.data.selected_brand,
  //     selected_style:this.data.selected_style,
  //     selected_function:this.data.selected_function,
  //     selected_price:this.data.selected_price,
  //   })
  // },

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
    console.log(this);
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
    })
    console.log(this.data);
  },
  onLoad:function(options){
    var that=this;
    wx.setNavigationBarTitle({
      title: ' ',
    })
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_all_style',
      data: {},
      method: 'GET',
      success: function(res){
        that.setData({
          nation:res.data.data.nation,
          brand:res.data.data.brand,
          style:res.data.data.goods_style,
          price:res.data.data.goods_price,
          'function':res.data.data.goods_function,
        });
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})