// pages/taobao/taobao.js
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
    order:0,
    sort: '',
    loadingShow:true,
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var that = this
    var cur = e.currentTarget.dataset.current;
      that.setData({
        order: cur,
        sort: '',
      })
    
  },
  // 价格按钮
  swichPice: function () {
    this.setData({
      order: 3,
    })
    if (this.data.sort == 1) {
      this.setData({
        sort: 2,
      })
    } else {
      this.setData({
        sort: 1,
      })
    }
  },
  //淘宝9.9商品
  getGoods: function () {
    var that = this
    http.httpGet('tbNineProductTotal', { page: that.data.page, limit: that.data.limit, order: that.data.order, sort: that.data.sort }, wx.getStorageSync('token'), function (res) {
      var goods = that.data.goods.concat(res.data.list)
      that.setData({
        goods: goods,
        loadingShow: true
      });
      wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        });
      }
    })
    that.getGoods()
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
     this.setData({
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