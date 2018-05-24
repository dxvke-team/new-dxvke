var http = require('httpHelper.js');
var config = require('../config.js');

function login(options,cb=''){
    if(options.is_share){
      var pid = options.share_member;
    } else if (options.scene){
      var pid = decodeURIComponent(options.scene);
    }else{
      var pid = '';
    }
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
                wx.setStorageSync('member_id', info.data.user_id);
                typeof cb == "function" && cb(info.data.token);
              }else{ //該用戶未註冊,獲取用戶信息進行註冊
                wx.setStorageSync('LoginSessionKey', info.data.session_key);
                //判斷該用户是否已授权
                wx.getSetting({
                  success:function(setData){
                    if (setData.authSetting['scope.userInfo'] == undefined || setData.authSetting['scope.userInfo'] == false){
                  
                      //跳转到登录页面
                      wx.navigateTo({
                        url: '../login/login?pid='+pid,
                      })
                    } else {
                      wx.getUserInfo({
                        success:function(newInfo){
                          wx.request({
                            method: 'POST',
                            url: config.HTTP_BASE_URL + 'doRegister',
                            data: {
                              encryptedData: newInfo.encryptedData,
                              iv: newInfo.iv,
                              session_key: wx.getStorageSync('LoginSessionKey'),
                              pid:pid
                            },
                            success: function (requestData) {
                              if (requestData.data.data.code == 200) { //成功
                                wx.setStorageSync('token', requestData.data.data.token);
                                wx.setStorageSync('member_id', requestData.data.data.user_id);
                                wx.navigateBack({
                                  delta: 1
                                })
                              } else {
                                wx.switchTab({
                                  url: '../index/index'
                                })
                              }
                            }
                          });
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        } else {
          wx.switchTab({
            url: '../index/index'
          })
        }
      }
    })
};

function getInfo(cb)
{
   wx.getUserInfo({
     success:function(res){
       typeof cb == "function" && cb(res.userInfo);
     },
     fail:function(res){
       //跳转到登录页面
       wx.navigateTo({
         url: '../login/login',
       })
     }
   })
}

module.exports = {
  login: login,
  getInfo: getInfo
};