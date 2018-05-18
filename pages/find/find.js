// pages/find/find.js
var http = require('../../utils/httpHelper.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    imgUrls: [], //banner图
    marginRight:"30rpx",
    marginLeft:"48rpx",
    num:3,
    goods: [], //商品列表
  },
  getBanner: function () {
    var that = this
    //首页banner - LQ
    http.httpPost("index_banner", {}, function (res) {
      that.setData({
        imgUrls: res.data.index_banner
      });
      wx.hideLoading();
    });
  },
  getGoods: function () {
    var that = this
    //首页商品 - LQ
    http.httpPost('index_goods', { page: that.data.page, limit: that.data.limit }, function (res) {
      var goods = that.data.goods.concat(res.data.goods)
      that.setData({
        goods: goods,
        loading: true,
      });
      wx.hideLoading();
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    var that = this;
    that.getBanner()
    that.getGoods()
  },
  toTaobao:function(){
    wx.navigateTo({
      url: '../taobao/taobao',
    })
  },
  toSeckill: function () {
    wx.navigateTo({
      url: '../seckill/seckill',
    })
  },
  toOverflow: function () {
    wx.navigateTo({
      url: '../overflow/overflow',
    })
  },
  toRecommend:function(){
    wx.navigateTo({
      url: '../recommend/recommend',
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
})