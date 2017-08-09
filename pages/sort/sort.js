//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
   currentTap: 1,
   
  },
  //事件处理函数
  tap: function(e) {
     var that = this;  
        if( this.data.currentTab === e.target.dataset.id ) {  
          return false;  
        } else {  
          that.setData( {  
            currentTap: e.target.dataset.id  
          })  
        }  
      }, 
 
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '分类',
      success: function(res) {
        // success
      }
    })
    var that=this;
   wx.request({
     url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_all_style',
     data: {},
     method: 'GET',
     success: function(res){
       console.log(res);

       that.setData({
         nation:res.data.data.nation,
         brand:res.data.data.brand,
         style:res.data.data.style,
       });
     }
   })
  }
})
