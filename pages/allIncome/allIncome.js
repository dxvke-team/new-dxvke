// pages/allIncome/allIncome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     show:false,
     command: "http://xlk.dxvke.com/api/toDownloadApp",
  },
  toshow: function (e) {
    var that = this;
    this.setData({
      show: false
    })
  },
  closeJuan: function (e) {
    this.setData({
      show: true
    })
  },
  /**
  * 一键复制淘口令
  */
  copyCommand: function () {
    var that = this;
    wx.setClipboardData({
      data: that.data.command,
      success: function (res) {
        // wx.showModal({
        //   content: '复制成功,请打开淘宝购买商品',
        //   showCancel: false,
        //   success: function (result) {
        //     if (result.confirm) {
        //       that.setData({
        //         show: true
        //       });
        //     }
        //   }
        // })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})