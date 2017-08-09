//index.js
//获取应用实例

var app = getApp()
Page({
  data:{
    display:"block",
    first:{
      f1:"../../image/comment3.png",
      f2:"../../image/comment3.png",
      f3:"../../image/comment3.png",
      f4:"../../image/comment3.png",
      f5:"../../image/comment3.png",
    },
    second:{
      s1:"../../image/comment3.png",
      s2:"../../image/comment3.png",
      s3:"../../image/comment3.png",
      s4:"../../image/comment3.png",
      s5:"../../image/comment3.png",
    },
    third:{
      t1:"../../image/comment3.png",
      t2:"../../image/comment3.png",
      t3:"../../image/comment3.png",
      t4:"../../image/comment3.png",
      t5:"../../image/comment3.png",
    },
    picindex :0
  },
  click1:function(event){
    //console.log(event);
    for(var i in this.data.first){
      if(i<=event.target.dataset.name){
        this.data.first[i]="../../image/five_pink.png";
      }else{
        this.data.first[i]="../../image/comment3.png";
      }
    }
   //console.log(event.target.dataset.name.substring(1,2));
    this.setData({
      first:this.data.first,
      first_star:event.target.dataset.name.substring(1,2)
    });
  },
  
  click2:function(event){
    //console.log(event);
    for(var i in this.data.second){
      if(i<=event.target.dataset.name){
        this.data.second[i]="../../image/five_pink.png";
      }else{
        this.data.second[i]="../../image/comment3.png";
      }
    }
   
    this.setData({
      second:this.data.second,
      second_star:event.target.dataset.name.substring(1,2)
    });
  },

  click3:function(event){
    //console.log(event);
    for(var i in this.data.third){
      if(i<=event.target.dataset.name){
        this.data.third[i]="../../image/five_pink.png";
      }else{
        this.data.third[i]="../../image/comment3.png";
      }
    }
    this.setData({
      third:this.data.third,
      third_star:event.target.dataset.name.substring(1,2)
    });
  },

  //评论内容
  evaluate_content:function(event){
    var content=event.detail.value;
    this.setData({
      content:content
    })
  },

  //上传图片


  //提交评价
  submit:function(){
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/evaluate',
      data: {
        first_star:this.data.first_star,
        second_star:this.data.second_star,
        third_star:this.data.third_star,
        content:this.data.content,
        order_id:this.data.order_id
      },
      method: 'GET', 
      header: {
        'Cookie' : wx.getStorageSync('account'),
      }, // 设置请求的 header
      success: function(res){
        wx.showToast({
          title: res.data.message,
          icon: 'success',
          duration: 1500
        })

        //回到我的订单
        setTimeout(function(){
        wx.redirectTo({
             url: '../../pages/orderlist/orderlist'
          })
        },1500);

       
        /*
        //返回上一页
        setTimeout(function(){
          wx.navigateBack({
            delta: 1, 
          })
        },1500);
        */

      }
    })
  },

  onLoad: function (options) {
    var order_id=options.order_id;
    this.setData({
      order_id:order_id,
    })
  },

  chooseimage: function () {  
    var _this = this;  
    wx.chooseImage({  
      count: 9, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {  
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        
        _this.setData({  
          tempFilePaths: res.tempFilePaths  
        })  
       var tempFilePath = res.tempFilePaths[0];  
        new AV.File('file-name', {  
          blob: {  
            uri: tempFilePath,  
          },  
        }).save().then(  
          file => console.log(file.url())  
          ).catch(console.error);  
      }  
    })  
  }
})
