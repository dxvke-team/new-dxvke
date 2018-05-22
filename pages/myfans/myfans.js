// pages/myfans/myfans.js
var login = require('../../utils/login.js');
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fansList:[],
    total:0,
    page:1,
    limit:20,
    noData:false
  },
  getList: function () {
    var that = this
    http.httpGet('myFansList', { page: that.data.page, limit: that.data.limit}, wx.getStorageSync('token'), function (res) {
      var fansList = that.data.fansList.concat(res.data.list)
      if(res.data.list.length < that.data.limit){
        that.setData({
          noData:true,
          loadingShow: true,
          fansList: fansList,
          total: res.data.total_count
        })
      }else{
        that.setData({
          loadingShow: true,
          fansList: fansList,
          total: res.data.total_count
        });
      }
      wx.stopPullDownRefresh()
    })
  },
  toTop: function () {
    wx.pageScrollTo({
      scrollTop:0
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    login.login(options);
    //分页请求粉丝列表接口
    that.setData({
      loadingShow: false,
    })
    that.getList()
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
      loadingShow: false,
      page: 1,
      fansList: [],
    })
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.noData){
      return false
    }else{
      var page=this.data.page + 1
      this.setData({
        loadingShow: false,
        page:page
      })
      this.getList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})