// pages/overflow/overflow.js
var http = require('../../utils/httpHelper.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    limit:20,
    goods: [
    //   {
    //   id: 1,
    //   pict_url: '../../images/empty_img.png',
    //   title: '商品名称',
    //   coupon_number: '100',
    //   zk_final_price: {
    //     rmb: '99',
    //     corner: '99'
    //   },

    // }
    ],
    loadingShow:true,
  },
  getGoods: function () {
    var that = this
    http.httpGet('overflowTotal', { page: that.data.page, limit: that.data.limit, order: 0, sort: that.data.sort }, wx.getStorageSync('token'), function (res) {
      var goods = that.data.goods.concat(res.data.list)
      that.setData({
        loadingShow: true,
        goods: goods,

      });
      wx.hideLoading();
    })
  },
  toGoodsDetail: function (e) {
    wx.navigateTo({
      url: "../JDdetail/JDdetail?id=" + e.currentTarget.dataset.id + '&type=2'
    })
  },
  toTop:function(){
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoods()
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
    var page = this.data.page + 1
    this.setData({
      page:page,
      loadingShow:false
    })
    this.getGoods()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})