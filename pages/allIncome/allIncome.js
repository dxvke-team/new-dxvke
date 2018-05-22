// pages/allIncome/allIncome.js
var http = require('../../utils/httpHelper.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     show:true,
     noData:false,
     loadingShow: true,
     command: "http://xlk.dxvke.com/api/toDownloadApp",
     page:1,
     limit:20,
     list:[],
     total_amount:0
  },
  // 获取收入列表
  getlist: function () {
    var that = this
    http.httpGet('totalAmoutList', { page: that.data.page, limit: that.data.limit}, wx.getStorageSync('token'), function (res) {
      var list = that.data.list.concat(res.data.list)
      if(res.data.list.length< that.data.limit){
        that.setData({
          noData:true,
          loadingShow: true,
          list: list,
          total_amount: res.data.total_amount
        })
      }else{
        that.setData({
          noData: false,
          loadingShow: false,
          list: list,
          total_amount: res.data.total_amount
        });
      }
      wx.stopPullDownRefresh()
    })
  },
  toTop: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
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
        //   content: '复制成功',
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
    this.setData({
      loadingShow: false,
    })
    this.getlist()
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
    this.setData({
      loadingShow: true,
      noData:false,
      list:[]
    })
    this.getlist()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.noData){
      return false
    }else{
      var page = this.data.page + 1
      this.setData({
        page: page,
        loadingShow: false,
        noData: false,
      })
      this.getlist();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})