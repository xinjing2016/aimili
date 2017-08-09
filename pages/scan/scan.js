// pages/scan/scan.js
Page({
  data:{},
  onLoad:function(options){
    // wx.scanCode({
    //   success: function(res){
    //     console.log(res)
    //   },
    //   fail: function() {
    //     wx.switchTab({
    //       url: '../../pages/index/index'
    //     })
    //   },
    //   complete: function() {
        
    //   }
    // })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    wx.scanCode({
      success: function(res){
        if(res.errMsg=="scanCode:ok"){
          wx.request({
            url: 'https://www.gaoliuxu.com/index.php/Home/Index/goods_detail',
            data: {
              goods_id:res.result,
            },
            method: 'GET', 
            success: function(re){
              console.log(re);
              if(re.data.goods){
                wx.showToast({
                  title: '扫码成功',
                  icon: 'success',
                  duration: 1500
                })
                setTimeout(function(){
                  wx.navigateTo({
                    url: '../../pages/goods/goods?goods_id='+res.result
                  })
                },1000);
              }else{
                wx.showToast({
                  title: '二维码无效',
                  icon: 'success',
                  duration: 1500
                })
                setTimeout(function(){
                  wx.switchTab({
                    url: '../../pages/index/index'
                  })
                },1000);
              }
            }
          })
          
        }
      },
      fail: function() {
        wx.switchTab({
          url: '../../pages/index/index'
        })
      },
      complete: function() {
        // complete
      }
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})