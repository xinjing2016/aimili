var app = getApp()
Page({
  data:{
    display:"block",
    selected:{
      sy:"selected",
      xstj:"",
      xbtj:"",
      jrtj:"",
      zxsj:"",
      lsjx:"",
      mmjx:"",
    },
    tab:{
      sy:"首页",
      xstj:"限时特价",
      xbtj:"小编推荐",
      jrtj:"今日特价",
      zxsj:"最新上架",
      lsjx:"零食精选",
      mmjx:"面膜精选",
    },
    show:{
      sy:"block",
      xstj:"none",
      xbtj:"none",
      jrtj:"none",
      zxsj:"none",
      lsjx:"none",
      mmjx:"none",
    },
  },

 

  click:function(event){
    console.log(event);
    for(var i in this.data.selected){
      if(i==event.target.dataset.name){
        this.data.selected[i]="selected";
      }else{
        this.data.selected[i]="";
      }
    }
    for(var i in this.data.show){
      if(i==event.target.dataset.name){
        this.data.show[i]="block";
      }else{
        this.data.show[i]="none";
      }
    }
    this.setData({
      selected:this.data.selected,
      show:this.data.show,
    });
  },

  //收藏
  collection:function(event){
    var goods_id=event.currentTarget.dataset.goods_id;
    var that=this;
    if(wx.getStorageSync('account')){
      wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/collection',
        data: {
          goods_id:goods_id,
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
        }
      })
    }else{
      wx.showToast({
          title: "未登录",
          icon: 'success',
          duration: 1500
      })
    }
  },

  //搜索
  search:function(event){
    wx.navigateTo({
      url: '../../pages/goods_list/goods_list?page=1&type=search&keyword='+event.detail.value,
    })
  },

  onShow:function(){
      var that=this;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/index',
      data: {},
      method: 'GET', 
      success: function(res){
        (function djtj(){
          var djtj=res.data.data['djtj'];
          console.log(djtj);
          for(var i in djtj){
            djtj[i]["display_img"]=djtj[i]["img"];
          }
          that.setData({
            goods_djtj:djtj
          });
        })();
        (function rxcp(){
          var rxcp=res.data.data['rxcp'];
          for(var i in rxcp){
            rxcp[i]["display_img"]=rxcp[i]["img"];
          }
          that.setData({
            goods_rxcp:rxcp
          });
        })();
        (function bmqd(){
          var bmqd=res.data.data['bmqd'];
          for(var i in bmqd){
            bmqd[i]["display_img"]=bmqd[i]["img"];
          }
          that.setData({
            goods_bmqd:bmqd
          });
          console.log(bmqd);
        })();
        (function xstj(){
          var xstj=res.data.data['xstj'];
          for(var i in xstj){
            xstj[i]["display_img"]=JSON.parse(xstj[i]["display_img"]);
          }
          that.setData({
            goods_xstj:xstj
          });
        })();
        (function xbtj(){
          var xbtj=res.data.data['xbtj'];
          for(var i in xbtj){
            xbtj[i]["display_img"]=JSON.parse(xbtj[i]["display_img"]);
          }
          that.setData({
            goods_xbtj:xbtj
          });
        })();
        (function jrtj(){
          var jrtj=res.data.data['jrtj'];
          for(var i in jrtj){
            jrtj[i]["display_img"]=JSON.parse(jrtj[i]["display_img"]);
          }
          that.setData({
            goods_jrtj:jrtj
          });
        })();
        (function zxsj(){
          var zxsj=res.data.data['zxsj'];
          for(var i in zxsj){
            zxsj[i]["display_img"]=JSON.parse(zxsj[i]["display_img"]);
          }
          that.setData({
            goods_zxsj:zxsj
          });
        })();
        (function lsjx(){
          var lsjx=res.data.data['lsjx'];
          for(var i in lsjx){
            lsjx[i]["display_img"]=JSON.parse(lsjx[i]["display_img"]);
          }
          that.setData({
            goods_lsjx:lsjx
          });
        })();
        (function mmjx(){
          var mmjx=res.data.data['mmjx'];
          for(var i in mmjx){
            mmjx[i]["display_img"]=JSON.parse(mmjx[i]["display_img"]);
          }
          that.setData({
            goods_mmjx:mmjx
          });
        })();
        (function lbt(){
          var lbt=res.data.data['lbt'];
          console.log(lbt);
          for(var i in lbt){
            lbt[i]["display_img"]=lbt[i]["img"];
          }
          that.setData({
            goods_lbt:lbt
          });
          
        })();
      }
    })

  },

  onLoad:function(){
    wx.setNavigationBarTitle({
      title: '爱美丽',
      success: function(res) {
        // success
      }
    })
  
  },
})