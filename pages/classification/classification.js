// pages/classification/classification.js
// Page({
//   data:{},
//   onLoad:function(options){
//     // 页面初始化 options为页面跳转所带来的参数
//   },
//   onReady:function(){
//     // 页面渲染完成
//   },
//   onShow:function(){
//     // 页面显示
//   },
//   onHide:function(){
//     // 页面隐藏
//   },
//   onUnload:function(){
//     // 页面关闭
//   }
// })

Page({
  data: {
    imgUrls: [{
      link:"../index/index",   url:'../../tabbar/navigation_cartbutton_normal.png'
    },
    {
      link:"../cart/cart",  url:'../../tabbar/navigation_cartbutton_normal.png'
    },
    {
      link:"../user/user",    url:'../../tabbar/navigation_cartbutton_normal.png'
    }],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  dd:function(){
    console.log("click event");
  }
})
