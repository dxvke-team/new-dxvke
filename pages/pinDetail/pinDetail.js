// pages/pinDeatail/pinDetail.js
var http = require('../../utils/httpHelper.js');
var login = require('../../utils/login.js');
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
    isShare: '',
    interval: 5000,
    duration: 1000,
    contact: false,
    isShen: false
  },

  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: that.data.goodsDetail.title,
      path: 'pages/pinDetail/pinDetail?id=' + that.data.goodsDetail.id + '&type=' + that.data.goodsType + '&is_share=1&share_member=' + wx.getStorageSync('member_id'),
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
    if (options.is_share == '1') {
      that.setData({
        isShare: true,
        shareMember: options.share_member
      });
    }
    login.login(options);
    that.getProductDetail(options);
    http.httpPost('checkMiniShen', {}, wx.getStorageSync('token'), function (res) {
      if (res.data.status) {
        that.setData({
          isShen: true
        });
      }
    });
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
  toUpdate: function () {
    wx.navigateTo({
      url: '../update/update',
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
    var copy_id = that.data.goodsDetail.copy_id + '-' + wx.getStorageSync('member_id');
    if (that.data.isShare) {
      copy_id += '-' + that.data.shareMember
    }
    wx.setClipboardData({
      data: copy_id,
      success: function (res) {
        //复制成功,记录领券信息
        that.setData({
          contact: true
        })
      }
    })
  },

  //跳转拼多多小程序
  jumpToPddMini: function () {
    var that = this;
    if (that.data.isShen) {
      return false;
    }
    console.log('into the pddCoupon');
    if (that.data.isShare) {
      var share_member = that.data.shareMember
    } else {
      var share_member = 0;
    }
    wx.navigateToMiniProgram({
      appId: that.data.goodsDetail.pdd_app_id,
      path: that.data.goodsDetail.pdd_mini_url,
      extraData: {
        userId: wx.getStorageSync('member_id')
      },
      // envVersion: 'develop',
      success(res) {
        // 打开成功,记录领券信息
        if (that.data.isShare) {
          var share_member = that.data.shareMember
        } else {
          var share_member = 0;
        }
        var condition = {
          goods_id: that.data.goodsDetail.id,
          share_member: share_member
        }
        http.httpPost('recordCouponNotePdd', condition, wx.getStorageSync('token'), function (res) {

        });
      }
    })
  }
})