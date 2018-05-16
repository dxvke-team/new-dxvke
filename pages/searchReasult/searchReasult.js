// pages/searchResault/searchReasult.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    keywords:'衣服',
    sort:0,
    goodsList1: [], //搜索结果 - LQ
    goodsList2: [],
    goodsList3: [],
    page1: 1,
    page2: 1,
    page3: 1,
    limit: 20,
    scrollTop: 0,
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var that = this
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      that.setData({
        currentTab: cur,
      })
    }
    that.setData({
      sort: 0,
    })
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  // 价格按钮
  swichPice:function(){
    this.setData({
      currentTab: 3,
    })
     if(this.data.sort==1){
       console.log('bb')
       this.setData({
         sort: 2,
       })
     }else{
       this.setData({
         sort: 1,
       })
     }
  },
  getGoodsList1: function () {
    var that = this
    console.log(that.data.keywords)
    http.httpPost('searchProduct', {
      keywords: that.data.keywords,
      product_type:'',
      order:'',
      sorts: '',
      page: that.data.page1,
      limit: that.data.limit,
    }, function (res) {
      var goodsList1 = that.data.goodsList1.concat(res.data.product_list)
      that.setData({
        goodsList1: goodsList1,
      });
      wx.hideLoading();
    });
  },
  getGoodsList2: function () {
    var that = this
    http.httpPost('searchProduct', {
      keywords: that.data.keywords,
      sort: 10,
      page: that.data.page2,
      limit: that.data.limit,
      member_id: wx.getStorageSync('member_id')
    }, function (res) {
      var goodsList2 = that.data.goodsList2.concat(res.data.product_list)
      that.setData({
        goodsList2: goodsList2,
      });
      wx.hideLoading();
    });
  },
  getGoodsList3: function () {
    var that = this
    http.httpPost('searchProduct', {
      keywords: that.data.keywords,
      sort: 11,
      page: that.data.page3,
      limit: that.data.limit,
      member_id: wx.getStorageSync('member_id')
    }, function (res) {
      var goodsList3 = that.data.goodsList3.concat(res.data.product_list)
      that.setData({
        goodsList3: goodsList3,
      });
      wx.hideLoading();
    });
  },
  // 获取焦点事件
  bindfocus: function (e) {
    wx.navigateBack({})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList1()
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