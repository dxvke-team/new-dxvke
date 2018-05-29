
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
  },

  onLoad: function () {
    var that = this;
    //获取用户信息
    login.getInfo(function(res){
      that.setData({
        userInfo:res
      });
    });
    this.getUserInfo()
  },

  onShow:function(){
    var that = this;
    wx.getUserInfo({
      success: function (res) {
       that.setData({
         userInfo:res.userInfo
       })
      },
    })
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
  }
})