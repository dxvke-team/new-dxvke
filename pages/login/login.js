// pages/login/login.js
var config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      pid : options.pid
    });
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  cancelInfo : function(){
    console.log('aaa')
    wx.switchTab({
      url: '../index/index',
    })
  },

  /**
   * 用户点击授权信息
   */
  userInfoHandler: function(res){
    var that = this;
    var userInfo = res.detail;
    if (userInfo.userInfo){
      wx.request({
        method : 'POST',
        url: config.HTTP_BASE_URL +'doRegister',
        data:{
          encryptedData: userInfo.encryptedData,
          iv : userInfo.iv,
          session_key: wx.getStorageSync('LoginSessionKey'),
          pid: that.data.pid
        },
        success:function(requestData){
          if (requestData.data.code == 200){ //成功
            wx.setStorageSync('token', requestData.data.data.token);
            wx.setStorageSync('member_id', requestData.data.data.user_id);
            wx.navigateBack({
              delta: 1
            })
          }else{
            wx.switchTab({
              url: '../index'
            })
          }
        }
      });
    } else {
      wx.switchTab({
        url: '../index/index'
      })
    }
  }
})