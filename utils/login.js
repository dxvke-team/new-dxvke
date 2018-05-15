var http = require('httpHelper.js');
var config = require('../config.js');
/*
function login (cb) {
  var that = this;
  //调用登录接口
  wx.login({
    success: function (result) {
      if (result.code) {
        var code = result.code;
        wx.getUserInfo({
          success: function (res) {
            //发起网络请求
            var userInfo = res.userInfo;
            http.httpPost('login', { code: code, user_info: res.rawData, encryptedData: res.encryptedData, iv: res.iv}, function (res) {
              //将session_key存档
              wx.setStorageSync('LoginSessionKey', res.session_key);
              wx.setStorageSync('token', res.token);
              typeof cb == "function" && cb(userInfo);
            });
          },
          fail: function () {
            wx.navigateBack({});
          }
        });
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    },
  });
};
*/
function login(){
    wx.login({
      success:function(res){
        if (res.code) {
          //发起网络请求
          wx.request({
            method:'POST',
            url: config.HTTP_BASE_URL + 'login',
            data: {
              code: res.code
            },
            success:function(info){
              if(info.data.status){ //該用戶已註冊
                wx.setStorageSync('LoginSessionKey', info.data.session_key);
                wx.setStorageSync('token', info.data.token);
              }else{ //該用戶未註冊,獲取用戶信息進行註冊
                wx.setStorageSync('LoginSessionKey', info.data.session_key);
                //判斷該用户是否已授权
                wx.getSetting({
                  success:function(setData){
                    if (setData.authSetting['scope.userInfo'] == undefined || setData.authSetting['scope.userInfo'] == false){
                  
                      //跳转到登录页面
                      wx.navigateTo({
                        url: '../login/login',
                      })
                      
                    } else {
                      wx.getUserInfo({
                        
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
}

module.exports = {
  login: login
};