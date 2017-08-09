//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  
  },

  //删除收藏
  delete_collection:function(event){
    var that=this;
    var goods_id=event.target.dataset.goods_id;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/collection',
      data: {
        goods_id:goods_id
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
          var goods=new Object();
          for(var i in that.data.goods){
            if(that.data.goods[i]["goods_id"]!=goods_id){
              goods[i]=that.data.goods[i];
            }
          }
          that.setData({
            goods:goods
          });
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500
          })
        }
      }
    })
  },

  onShow:function(){ // 页面显示

   var that=this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/collection_list',
      data: {

      },
      method: 'GET', 
      header: {
        'Cookie' : wx.getStorageSync('account'),
      }, // 设置请求的 header
      success: function(res){
        if(res.data.errorcode==0){
          var goods=res.data.data;
          for(var i in goods){
            goods[i]["display_img"]=JSON.parse(goods[i]["display_img"]);
          }
          that.setData({
            goods:goods,
          })
        }
      }
    })

  },
 
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '我的收藏',
      success: function(res) {
        // success
      }
    })

    
  }
})
