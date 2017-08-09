//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    opacity:0,
    province:null,
    city:null,
    town:null,
    eprovince:null,
    ecity:null,
    etown:null,
    add_address_block:"block",
    edit_address_block:"block",
    address_block:"none",
  },

  //设为默认地址
  default_address:function(event){
    var that=this;
    var index=event.target.dataset.index;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/set_address_default',
      data: {
        address_id:that.data.address[index]["address_id"],
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
        if(res.data.errorcode==0){
          for(var i in that.data.address){
            if(that.data.address[i]==that.data.address[index]){
              that.data.address[i]["default_address"]=1;
            }else{
              that.data.address[i]["default_address"]=0;
            }
          }
          that.setData({
            address:that.data.address,
          });
        }
      }
    })
  },

  //删除地址
  delete_address:function(event){
    var that=this;
    var address_id=event.target.dataset.address_id;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/delete_user_address',
      data: {
        address_id:address_id
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
        var new_address=new Object();
        if(res.data.errorcode==0){
          for(var i in that.data.address){
            if(that.data.address[i]["address_id"]!=address_id){
              new_address[i]=that.data.address[i];
            }
          }
          that.setData({
           address:new_address
          });
        }
        
      }
    })
  },
  
  //添加地址
  add_address:function(event){
    console.log(event);
  },

  //点击添加地址按钮
  add_address_btn:function(){
    wx.setNavigationBarTitle({
      title: '新增地址',
      success: function(res) {
        // success
      }
    })
    var that=this;
    this.data.add_address_block="block";
    this.data.address_block="none";
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_address',
      data: {
        level:1,
      },
      method: 'GET', 
      success: function(res){
        if(res.data.errorcode==1){
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500
         })
        }else{
          that.setData({
            province:res.data.data,
            province_id:0,
          });
        }
        wx.request({
          url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_address',
          data: {
            key:res.data.data[0]["district"],
            level:2
          },
          method: 'GET',
          success: function(re){
            if(res.data.errorcode==0){
              that.setData({
                city:re.data.data,
                city_id:0,
              });
              wx.request({
                url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_address',
                data: {
                  key:re.data.data[0]["district"],
                  level:3
                },
                method: 'GET',
                success: function(r){
                  if(r.data.errorcode==0){
                    that.setData({
                      town:r.data.data,
                    });
                  }
                }
              })
            }
          }
        })
      }
    })
    this.setData({
      add_address_block:this.data.add_address_block,
      address_block:this.data.address_block,
    })
  },

  //切换地址
  bindChange:function(event){
    var that=this;
    var arr=event.detail.value;
    //console.log(arr);
    if(arr[0]==that.data.province_id){//省份不变
      if(arr[1]!=that.data.city_id){//城市改变
        wx.request({
          url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_address',
          data: {
               key:that.data.city[arr[1]]["district"],
               level:3
          },
          method: 'GET',
          success: function(re){
            if(re.data.errorcode==0){
              that.setData({
                town:re.data.data,
                city_id:arr[1],
              });
            }
          }
        })
      }
    }else{//省份改变
      wx.request({
          url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_address',
          data: {
            key:that.data.province[arr[0]]["district"],
            level:2
          },
          method: 'GET',
          success: function(res){
            if(res.data.errorcode==0){
              var c_i=0;
              if((res.data.data.length-1)>=arr[1]){
                c_i=arr[1];
              }else{
                c_i=res.data.length-1;
              }
              that.setData({
                city:res.data.data,
                city_id:c_i,
                province_id:arr[0],
              });
              wx.request({
                url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_address',
                data: {
                  key:res.data.data[c_i]["district"],
                  level:3
                },
                method: 'GET',
                success: function(re){
                  if(re.data.errorcode==0){
                    that.setData({
                      town:re.data.data,
                    });
                  }
                }
              })
            }
          }
        })
    }
    setTimeout(function(){
      that.setData({
        select_province:that.data.province[arr[0]]["district"],
        select_city:that.data.city[arr[1]]["district"],
        select_town:that.data.town[arr[2]]["district"]
      })
    },2000);
  },

  //新增地址提交
  new_address_formSubmit:function(event){
    var that=this;
    var value=event.detail.value;
    var detail=that.data.select_province+" "+that.data.select_city+" "+that.data.select_town+" "+value.new_detail;
    
console.log('我的地址'+that.data.select_province+that.data.select_city+that.data.select_town);

     if(!that.data.select_province){
        wx.showToast({
          title: '请选择省',
          icon: 'success',
          duration: 2000
      })
    }else if(!that.data.select_city){
        wx.showToast({
          title: '请选择市',
          icon: 'success',
          duration: 2000
      })
    }else if(!that.data.select_town){
         wx.showToast({
          title: '请选择区',
          icon: 'success',
          duration: 2000
      })
    }else if(value.new_name==''){
        wx.showToast({
          title: '请填写收货人姓名',
          icon: 'success',
          duration: 2000
      })
    }else if(value.new_phone==''){
         wx.showToast({
          title: '请填写收货人电话',
          icon: 'success',
          duration: 2000
      })
    }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value.new_phone))){ 
      wx.showToast({
          title: '手机号码有误，请重填',
          icon: 'success',
          duration: 2000
      })
       
    }else if(value.new_detail==''){
       wx.showToast({
          title: '请填写详细地址',
          icon: 'success',
          duration: 2000
      })
       
    } else{

        wx.request({
        url: 'https://www.gaoliuxu.com/index.php/Home/Index/add_user_address',
        data: {
          detail:detail,
          consignee_name:value.new_name,
          consignee_phone:value.new_phone
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
          setTimeout(function(){
            that.setData({
              address_block:"block",
              add_address_block:"none",
            });
            that.onLoad();
          },1500);
          }
        }
      })

    }   
    
  },


  //编辑地址
  edit_address:function(event){
    wx.setNavigationBarTitle({
      title: '修改地址',
      success: function(res) {
        // success
      }
    })
    var index=event.target.dataset.index;
    var that=this;
    // this.data.add_address_block="block";
    // this.data.address_block="none";
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_address',
      data: {
        level:1,
      },
      method: 'GET', 
      success: function(res){
        if(res.data.errorcode==1){
          wx.showToast({
            title: res.data.message,
            icon: 'success',
            duration: 1500
         })
        }else{
          that.setData({
            eprovince:res.data.data,
            eprovince_id:0,
          });
        }
        wx.request({
          url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_address',
          data: {
            key:res.data.data[0]["district"],
            level:2
          },
          method: 'GET',
          success: function(re){
            if(res.data.errorcode==0){
              that.setData({
                ecity:re.data.data,
                ecity_id:0,
              });
              wx.request({
                url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_address',
                data: {
                  key:re.data.data[0]["district"],
                  level:3
                },
                method: 'GET',
                success: function(r){
                  if(r.data.errorcode==0){
                    that.setData({
                      etown:r.data.data,
                    });
                  }
                }
              })
            }
          }
        })
      }
    })
    this.setData({
      address_id:this.data.address[index]["address_id"],
      consignee_name:this.data.address[index]["consignee_name"],
      consignee_phone:this.data.address[index]["consignee_phone"],
      add_address_block:"none",
      address_block:"none",
      edit_address_block:"block",
    });
  },


  //编辑地址切换地址
  ebindChange:function(event){
    var that=this;
    var arr=event.detail.value;
    //console.log(arr);
    if(arr[0]==that.data.eprovince_id){//省份不变
      if(arr[1]!=that.data.ecity_id){//城市改变
        wx.request({
          url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_address',
          data: {
               key:that.data.ecity[arr[1]]["district"],
               level:3
          },
          method: 'GET',
          success: function(re){
            if(re.data.errorcode==0){
              that.setData({
                etown:re.data.data,
                ecity_id:arr[1],
              });
            }
          }
        })
      }
    }else{//省份改变
      wx.request({
          url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_address',
          data: {
            key:that.data.eprovince[arr[0]]["district"],
            level:2
          },
          method: 'GET',
          success: function(res){
            if(res.data.errorcode==0){
              var c_i=0;
              if((res.data.data.length-1)>=arr[1]){
                c_i=arr[1];
              }else{
                c_i=res.data.length-1;
              }
              that.setData({
                ecity:res.data.data,
                ecity_id:c_i,
                eprovince_id:arr[0],
              });
              wx.request({
                url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_address',
                data: {
                  key:res.data.data[c_i]["district"],
                  level:3
                },
                method: 'GET',
                success: function(re){
                  if(re.data.errorcode==0){
                    that.setData({
                      etown:re.data.data,
                    });
                  }
                }
              })
            }
          }
        })
    }
    setTimeout(function(){
      that.setData({
        eselect_province:that.data.eprovince[arr[0]]["district"],
        eselect_city:that.data.ecity[arr[1]]["district"],
        eselect_town:that.data.etown[arr[2]]["district"]
      })
    },2000);
  },

  //编辑地址提交
  edit_address_formSubmit:function(event){
    var that=this;
    var value=event.detail.value;
    var detail=that.data.eselect_province+" "+that.data.eselect_city+" "+that.data.eselect_town+" "+value.edit_detail;
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/modify_user_address',
      data: {
        address_id:that.data.address_id,
        consignee_name:value.edit_name,
        consignee_phone:value.edit_phone,
        detail:detail
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
         setTimeout(function(){
           that.setData({
             edit_address_block:"none",
             address_block:"block",
           });
           that.onLoad();
         },1500);
        }
      }
    })
  },

  //取消操作
  cancel:function(){
    wx.setNavigationBarTitle({
      title: '收货地址',
      success: function(res) {
        // success
      }
    })
    this.setData({
      add_address_block:"none",
      address_block:"block",
      edit_address_block:"none",
    });
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '收货地址',
      success: function(res) {
        // success
      }
    })
    var that=this;
    this.setData({
      add_address_block:"none",
      edit_address_block:"none",
      address_block:"block",
      opacity:1,
    })
    wx.request({
      url: 'https://www.gaoliuxu.com/index.php/Home/Index/get_user_address',
      data: {},
      method: 'GET',
      header: {
        'Cookie' : wx.getStorageSync('account'),
      }, // 设置请求的 header
      success: function(res){
        console.log(res.data.data[0]["detail"]);//
        var d=JSON.parse(res.data.data[0]["detail"]);
        console.log(d);
        for( var i in res.data.data){
          res.data.data[i]["detail"]=JSON.parse(res.data.data[i]["detail"]);
        }
        that.setData({
          address:res.data.data,
        });
      }
    })
  },

  // onShow:function(){
  //   console.log(this);
  // }

})
