// pages/update/update.js
var login = require('../../utils/login.js');
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userl:true,
    showModel:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    login.getInfo(function (res) {
      that.setData({
        userInfo: res,
      });
    });
    this.getUserInfo()
  },
  getUserInfo: function () {
    //请求用户信息接口
    var that = this;
    http.httpGet('userInfo', {}, wx.getStorageSync('token'), function (res) {
      that.setData({
        level: res.data.level_id
      });
      wx.stopPullDownRefresh()
    });
  },
  update:function(){
    var that = this
    http.httpPost("applyUpgrade", {}, wx.getStorageSync('token'), function (res) {
       if(res.code==200){
          wx.showModal({
          content: res.data.message,
          showCancel: false,
          confirmColor:'#9a7bff',
          confirmText:"知道了",
          success: function (result) {
            console.log(result)
            if (result.confirm) {
             wx.navigateBack({})
            }
          }
        })
       }else if(res.code=400){
         wx.showModal({
           content: res.error,
           showCancel: false,
           confirmColor: '#9a7bff',
           confirmText: "知道了",
           success: function (result) {
             if (result.confirm) {
               that.setData({
                 show: true
               });
             }
           }
         })
       }
    });
    
    
  },
  update2: function () {
    var that = this
    http.httpPost("checkUpgradeLevel3", {}, wx.getStorageSync('token'), function (res) {
      if (res.code == 200) {
        wx.showModal({
          content: res.data.message,
          showCancel: false,
          confirmColor: '#9a7bff',
          confirmText: "知道了",
          success: function (result) {
            console.log(result)
            if (result.confirm) {
              wx.navigateBack({})
            }
          }
        })
      } else if (res.code = 400) {
        wx.showModal({
          content: res.error,
          showCancel: false,
          confirmColor: '#9a7bff',
          confirmText: "知道了",
          success: function (result) {
            if (result.confirm) {
              that.setData({
                show: true
              });
            }
          }
        })
      }
    });
  },
  toContact: function () {
    this.setData({
      showModel: false
    })
  },
  closeModel: function () {
    this.setData({
      showModel: true,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },
})