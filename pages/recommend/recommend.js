// pages/recommend/recommend.js
var http = require('../../utils/httpHelper.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods1: [
      // {
      // id: 1,
      // pict_url: '../../images/empty_img.png',
      // title: '商品名称',
      // coupon_number: '100',
      // zk_final_price: {
      //   rmb: '99',
      //   corner: '99'
      // },
    ],
    currentTab:0,
    sort:'',
    scrollTop:0,
    winHeight:'',
    page1:1,
    page2:1,
    page3:1,
    page4:1,
    limit:20,
    goods2:[],
    goods3:[],
    goods4:[],
    loadingShow:true,

  },
  getGoods1: function () {
    var that = this
    http.httpGet('recommentTotal', { page: that.data.page1, limit: that.data.limit, order: 0, sort: that.data.sort }, wx.getStorageSync('token'), function (res) {
      var goods1 = that.data.goods1.concat(res.data.list)
      that.setData({
        loadingShow: true,
        goods1: goods1,

      });
      wx.hideLoading();
    })
  },
  getGoods2: function () {
    var that = this
    http.httpGet('recommentTotal', { page: that.data.page2, limit: that.data.limit, order: 1, sort: that.data.sort }, wx.getStorageSync('token'), function (res) {
      var goods2 = that.data.goods2.concat(res.data.list)
      that.setData({
        loadingShow: true,
        goods2: goods2,

      });
      wx.hideLoading();
    })
  },
  getGoods3: function () {
    var that = this
    http.httpGet('recommentTotal', { page: that.data.page3, limit: that.data.limit, order: 2, sort: that.data.sort }, wx.getStorageSync('token'), function (res) {
      var goods3 = that.data.goods3.concat(res.data.list)
      that.setData({
        loadingShow: true,
        goods3: goods3,
      });
      wx.hideLoading();
    })
  },
  getGoods4: function () {
    var that = this
    http.httpGet('recommentTotal', { page: that.data.page4, limit: that.data.limit, order: 3, sort: that.data.sort }, wx.getStorageSync('token'), function (res) {
      var goods4 = that.data.goods4.concat(res.data.list)
      that.setData({
        loadingShow: true,
        goods4: goods4,
      });
      wx.hideLoading();
    })
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var that = this
    var cur = Number(e.currentTarget.dataset.current);
    if (this.data.currentTab == cur) { return false; }
    else {
      that.setData({
        currentTab: cur,
      })
    }
    that.setData({
      sort:'',
      scrollTop: 0
    })
  },
  // 价格按钮
  swichPice: function () {
    if (this.data.sort == 1) {
      this.setData({
        sort: 2,
        currentTab: 3,
        goods4:[],
        page4:1,
      })
    } else {
      this.setData({
        sort: 1,
        currentTab: 3,
        goods4: [],
        page4: 1,
      })
    }
    this.getGoods4()
  },
  toTop: function () {
    var that = this
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = -80 * rpxR;
        that.setData({
          scrollTop: calc
        });
      }
    });
  },
  lower: function (e) {
    var cur = this.data.currentTab
    var that = this
    switch (cur) {
      case 0:
        var page1 = this.data.page1 + 1
        this.setData({
          page1: page1,
          loadingShow: false,
        })
        that.getGoods1();
        break;
      case 1:
        var page2 = this.data.page2 + 1
        this.setData({
          page2: page2,
          loadingShow: false,
        })
        that.getGoods2();
        break;
      case 2:
        var page3 = this.data.page3 + 1
        this.setData({
          page3: page3,
          loadingShow: false,
        })
        that.getGoods3();
        break;
      case 3:
        var page4 = this.data.page4 + 1
        this.setData({
          page4: page4,
          loadingShow: false,
        })
        that.getGoods4();
        break;
    }
  },
  toGoodsDetail: function (e) {
    wx.navigateTo({
      url: "../pinDetail/pinDetail?id=" + e.currentTarget.dataset.id + '&type=1'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR
        that.setData({
          winHeight: calc
        });
      }
    });
    that.getGoods1()
    that.getGoods2()
    that.getGoods3()
  
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