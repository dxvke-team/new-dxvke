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
    bargain: true,
    goods1: [], //商品列表
    goods2: [], //商品列表
    goods3: [], //商品列表
    goods4: [], //商品列表
  },
   //banner
  getBanner: function () {
    var that = this
    http.httpGet("indexBanner", {type:11},wx.getStorageSync('token'), function (res) {
      that.setData({
        imgUrls: res.data
      });
      wx.hideLoading();
    });
  },
  //淘宝9.9商品
  getGoods1: function () {
    var that = this
    http.httpPost('tbNineProductTen', {}, wx.getStorageSync('token'), function (res) {
      that.setData({
        goods1: res.data,
      });
      wx.hideLoading();
    })

  },
  //急速秒杀商品
  getGoods2: function () {
    var that = this
    http.httpPost('discoverPdd', {}, wx.getStorageSync('token'), function (res) {
      that.setData({
        goods2: res.data,
      });
      wx.hideLoading();
    })

  },
  //超值购商品
  getGoods3: function () {
    var that = this
    http.httpPost('OverflowTen', {}, wx.getStorageSync('token'), function (res) {
      that.setData({
        goods3: res.data,
      });
      wx.hideLoading();
    })

  },
  //为你推荐商品
  getGoods4: function () {
    var that = this
    http.httpPost('recommendTen', {}, wx.getStorageSync('token'), function (res) {
      that.setData({
        goods4: res.data,
      });
      wx.hideLoading();
    })

  },
  toGoodsDetail:function(e){
    wx.navigateTo({
      url: "../goodsDetail/goodsDetail?id=" + e.currentTarget.dataset.id + '&type=0'
    })
  },
  toPinDetail:function(e){
    wx.navigateTo({
      url: "../pinDetail/pinDetail?id=" + e.currentTarget.dataset.id + '&type=1'
    })
  },
  toJDdetail:function(e){
    wx.navigateTo({
      url: "../JDdetail/JDdetail?id=" + e.currentTarget.dataset.id + '&type=2'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
         token:res.data
        });
      }
    })

    http.httpGet('checkMiniShen',{},wx.getStorageSync('token'),function(res){
      console.log(res);
      if(!res.data.status){
        that.setData({
          bargain:false
        });
      }
    });

    that.getBanner()
    that.getGoods1()
    that.getGoods2()
    that.getGoods3()
    that.getGoods4()
  },
  toTop: function () {
    wx.pageScrollTo({
      scrollTop: 0
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
    var that =this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    that.getBanner()
    that.getGoods1()
    that.getGoods2()
    that.getGoods3()
    that.getGoods4()
    wx.stopPullDownRefresh()
  },
})