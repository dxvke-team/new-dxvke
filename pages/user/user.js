
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
  },

  onLoad: function () {
    var that = this;
    //获取用户信息
    login.getInfo(function(res){
      that.setData({
        userInfo:res
      });
    });

    //请求用户信息接口
    http.httpGet('userInfo', {}, wx.getStorageSync('token'),function(res){
      that.setData({
        userInfoApi: res.data
      });
    });
  },

toOrderList:function(e){
  var type = e.currentTarget.dataset.type
  wx.navigateTo({
    url: '../orderList/orderList?type='+type,
  })
},

toAll:function(e){
    wx.navigateTo({
      url: '../allIncome/allIncome',
    })
},

toEstimate:function(e){
    wx.navigateTo({
      url: '../estimate/estimate',
    })
  },
  toMyfans:function(e){
    wx.navigateTo({
      url: '../myfans/myfans',
    })
  },
  toUpdate: function (e) {
    wx.navigateTo({
      url: '../update/update',
    })
  }
})