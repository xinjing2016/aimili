// pages/goodsgroup/goodsgroup.js
Page({
  data:{

  },
  onLoad:function(options){
    //console.log(options.key);
    var title;
    if(options.key=="hwjx"){
      title="海外精选";
    }else if(options.key=="gnjx"){
      title="国内精选";
    }else if(options.key=="qqls"){
      title="全球零食";
    }else if(options.key=="xlph"){
      title="销量排行";
    }
    wx.setNavigationBarTitle({
      title: title,
      success: function(res) {
        // success
      }
    })
    var that=this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/goods_group',
      data: {
        key:options.key,
      },
      method: 'GET', 
      success: function(res){
        (function (){
          var goods=res.data.data;
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
             goods[i]["youhui"]=toDecimal(parseFloat(goods[i]["price"])-parseFloat(goods[i]["discount_price"]));
            
          }
    //      console.log(goods);
        
          that.setData({
            goods:goods,
            title:title
          });
        })();
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
