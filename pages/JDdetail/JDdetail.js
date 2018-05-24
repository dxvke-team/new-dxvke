// pages/JDdeatail/JDdetail.js
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
    command: '', //淘口令
    goodsType: '', //商品类型
    isShare : false,
    shareMember : '',
    contact:false,
    isShen : false
  },

  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: that.data.goodsDetail.title,
      path: 'pages/JDdetail/JDdetail?id=' + that.data.goodsDetail.id + '&type=' + that.data.goodsType + '&is_share=1&share_member='+ wx.getStorageSync('member_id'),
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
    if (options.is_share == '1'){
      that.setData({
        isShare : true,
        shareMember : options.share_member
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
      console.log(res);
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
    if(that.data.isShare){
      copy_id += '-' + that.data.shareMember
    }
    wx.setClipboardData({
      data: copy_id,
      success: function (res) {
        that.setData({
          contact:true,
        })
        // wx.showModal({
        //   content: '复制成功',
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
  },
  toUpdate: function () {
    wx.navigateTo({
      url: '../update/update',
    })
  }
})