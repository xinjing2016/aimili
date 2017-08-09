// pages/goodslist/goodslist.js
Page({
  data:{},
  onLoad:function(options){
    var that=this;
    console.log(options);
    if(options.page==1){
      that.setData({
        page:1,
        'type':options.type,
        keyword:options.keyword,
      })
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:options.page,
          'type':options.type,
          keyword:options.keyword,
        },
        method: 'GET', 
        success: function(res){
          var goods=res.data.data;
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods
          })
        }
      })
    }else if(options.page==2){
      that.setData({
        page:2,
        key:options.key,
        keyword:options.keyword
      })
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_goods_list',
        data: {
          page:options.page,
          key:options.key,
          keyword:options.keyword,
        },
        method: 'GET', 
        success: function(res){
          var goods=res.data.data;
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods
          })
        }
      })
    }
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