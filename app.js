//app.js
// App({
//   globalDat:{
      
//   },
//   onLaunch:function(){
//     wx.login({
//       success: function(res){
        
//       },
//       fail: function() {
//         // fail
//       },
//       complete: function() {
//         // complete
//       }
//     })
//   }
  // onLaunch: function () {
  //   //调用API从本地缓存中获取数据
  //   var logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
  // },
  // getUserInfo:function(cb){
  //   var that = this
  //   if(this.globalData.userInfo){
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   }else{
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  // globalData:{
  //   userInfo:null
  // }

//})
App({
  globalData:{
    img:"",
    nickName:"",
  },
  onLaunch: function () {
    var that=this;
    wx.login({
      success: function(res){
        //console.log(res);
         wx.getUserInfo({
           success: function(re){
             // success
             //console.log(re);
             that.globalData.img=re.userInfo.avatarUrl;
             that.globalData.nickName=re.userInfo.nickName;
           }
         })
      }
    })
  },
  
})