
const app = getApp();
var http = require('../../utils/httpHelper.js');
var login = require('../../utils/login.js');
wx.showShareMenu({
  withShareTicket: true
})
Page({
  data: {
    userInfo: {},
    userInfoApi: {},
    hasUserInfo: false,
    showModel:true,
    login:true
  },

  onLoad: function () {
    var that = this;
    //获取用户信息
  },


onShow:function(){
  var that = this;
  login.getInfo(function (res) {
    if (res){
      that.setData({
        userInfo: res
      });
      that.getUserInfo()
    }else{
      that.setData({
        login:false
      });
    }
  });
  
},
getUserInfo:function(){
  //请求用户信息接口
  var that = this;
  http.httpGet('userInfo', {}, wx.getStorageSync('token'), function (res) {
    that.setData({
      userInfoApi: res.data
    });
    wx.stopPullDownRefresh()
  });
},

  toOrderList:function(e){
    var type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: '../orderList/orderList?type='+type,
    })
  },

  onPullDownRefresh: function () {
    this.getUserInfo()
  },
  toContact:function(){
    this.setData({
      showModel:false
    })
  },
  closeModel:function(){
    this.setData({
      showModel: true,
    })
  },

  cancelInfo : function()
  {
    wx.reLaunch({
      url: '../index/index',
    })
  },

  userInfoHandler: function (res) {
    var that = this;
    var userInfo = res.detail;
    login.userInfoHandler(userInfo, that.data.pid, function (res) {
      if (res == undefined) {
        return false;
      } else {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              login: true,
              userInfo : res.userInfo
            });
            that.getUserInfo();
          }
        })
      }
    });
  }
})