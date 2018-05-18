// pages/pinDeatail/pinDetail.js
var http = require('../../utils/httpHelper.js');
const app = getApp();
wx.showShareMenu({
  withShareTicket: true
})
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: 4,
    showAcer: true,
    showService: true,
    showJuan: true,
    goodsDetail: {}, // 商品详情 - LQ
    command: "234325", //淘口令
    goodsType: '', //商品类型
  },

  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: that.data.goodsDetail.title,
      path: 'pages/goodsDetail/goodsDetail?id=' + that.data.goodsDetail.id + '&type=' + that.data.goodsType + 'is_share=1&share_member=' + wx.getStorageSync('member_id'),
      success: function (res) {
        // 转发成功
        wx.showModal({
          content: '转发成功',
          showCancel: false,
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      show: false
    });
    login.login(options);
    that.getProductDetail(options);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  toHome: function (e) {
    wx.switchTab({
      url: '../index/index',
    })
  },
  service: function () {
  
  },
  close: function (e) {
    this.setData({
      showService: true
    })
  },
  showJuan: function (e) {
    this.setData({
      showJuan: false
    })
  },
  closeJuan: function (e) {
    this.setData({
      showJuan: true
    })
  },

  /**
   * 获取商品详情 - 20180112 - LQ
   */
  getProductDetail: function (options) {
    var that = this;
    if (options.type) {
      that.setData({
        goodsType: options.type
      });
    }
    http.httpGet('productInfo', {
      id: options.id,
      product_type: options.type
    }, wx.getStorageSync('token'), function (res) {
      that.setData({
        goodsDetail: res.data
      });
    });
  },
  /**
   * 一键复制淘口令 - 20180115 - LQ
   */
  copyCommand: function () {
    var that = this;
    console.log(that.data.command)
    wx.setClipboardData({
      data: that.data.command,
     
      success: function (res) {
        // wx.showModal({
        //   content: '复制成功,请打开淘宝购买商品',
        //   showCancel: false,
        //   success: function (result) {
        //     if (result.confirm) {
        //       that.setData({
        //         showJuan: true
        //       });
        //     }
        //   }
        // })
      }
    })
  }
})