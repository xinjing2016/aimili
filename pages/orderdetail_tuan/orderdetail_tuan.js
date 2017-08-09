//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    
  },
  
  onLoad: function () {
    //等待拼团商品的倒计时
    countdown(this,app.order['order_time']),

    wx.setNavigationBarTitle({
      title: '团购详情',
      success: function(res) {
        // success
      }
    })


     var that=this;
    if(app.order['grouped']==1 && !app.order['regimental_id']
){ //查找团购参与者信息
console.log('欢迎查找1');
         wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_group_user_img',
        data: {
          order_id:app.order['order_id'],
          manage:1,
          },
        method: 'GET', 
        header: {
          'Cookie' : wx.getStorageSync('account'),
        }, // 设置请求的 header
        success: function(res){
          that.setData({ 
           img_1:app.globalData.img,
           img_2:res.data.data['img'],
          });
        }
      })
       console.log('欢迎到来');
    }else if(app.order['grouped']==1 && app.order['regimental_id']){   //查看团购发起参与者信息
console.log('欢迎查找2');
 wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_group_user_img',
        data: {
          order_id:app.order['order_id'],
          manage:2,
          },
        method: 'GET', 
        header: {
          'Cookie' : wx.getStorageSync('account'),
        }, // 设置请求的 header
        success: function(res){  

          that.setData({ 
            img_1:res.data.data['img'],
            img_2:app.globalData.img,         
          });
        }
      })
}   

  
    console.log(app.order);
    console.log(app.order['goods_id']);
    this.setData({
      order:app.order,
      img_satar:app.globalData.img,
     
    });
 
  },

  //分享
  onShareAppMessage: function () {
    return {
      title: '拼团',
      path: '/pages/goods/goods?goods_id='+app.order['goods_id'],      success: function(res) {
        // 分享成功
        console.log('拼团分享成功');
      },
      fail: function(res) {
        // 分享失败
        console.log('拼团分享失败');
      } 
    }
  },

  //再次开团
  re_group:function(event){
    wx.redirectTo({
      url: '../../pages/goods/goods?goods_id='+event.target.dataset.goods_id
    })
  }
})

  
//var total_micro_second = 10 * 1000;//这是10秒倒计时  
       
/* 毫秒级秒杀倒计时 */  
function countdown(that,buyTime) {

var dd =(new Date()).valueOf();
//过期日期
var last_time = Date.parse(new Date(buyTime.replace(/-/g,"/")))+3600*24*1000; 
//var last_time = Date.parse(new Date(buyTime.replace(/-/g,"/")))+5*60*1000; 

    //相差毫秒数量   
    var wait_time =last_time-dd;

    // 渲染倒计时时钟  
    that.setData({  
      clock:dateformat(wait_time)//格式化时间  
    });  
    
    if (wait_time <= 0) {  
      that.setData({  
        clock:"拼团结束"  
      });  
      // timeout则跳出递归  
      return ;  
    }    
  
    //settimeout实现倒计时效果  
    setTimeout(function(){  
    // 放在最后--  
    wait_time -= 1000;  
    countdown(that,buyTime);  
  }  
  ,1000)//注意毫秒的步长受限于系统的时间频率，于是我们精确到0.01s即10ms  
}  
    
// 时间格式化输出，如1天天23时时12分分12秒秒12 。每10ms都会调用一次  
function dateformat(micro_second) {  
    // 总秒数  
    var second = Math.floor(micro_second / 1000);  
    // 天数  
    var day = Math.floor(second / 3600/24);  
    // 总小时  
    var hr = Math.floor(second / 3600);  
    // 小时位  
    var hr2 = hr%24;  
    // 分钟位  
    var min = Math.floor((second - hr * 3600) / 60);  
    // 秒位  
  var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;  
  // 毫秒位，保留2位  
  var micro_sec = Math.floor((micro_second % 1000) / 10);  
  return hr2 + ":" + min + ":" + sec ;  
}  

