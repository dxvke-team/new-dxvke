// pages/goodsDeatail/goodsDetail.js
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
     list:4,
     showAcer:true,
     showService:true,
     showJuan:true,
     goodsDetail:{}, // 商品详情 - LQ
     command:'', //淘口令
     goodsType:'', //商品类型,
     isShare : false,
     shareMember : '',
     isShen : false
  },

  onShareAppMessage: function () {
    var that = this;
    var member_id = wx.getStorageSync('member_id');
    return {
      title: that.data.goodsDetail.title,
      path: 'pages/goodsDetail/goodsDetail?id=' + that.data.goodsDetail.id +'&type='+that.data.goodsType + '&share_member=' + member_id + '&is_share=1',
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
      show:false
    });
    if(options.is_share == 1){
      that.setData({
        isShare : true,
        shareMember : options.share_member
      });
    }
    login.login(options);
    that.getProductDetail(options);

    http.httpPost('checkMiniShen',{},wx.getStorageSync('token'),function(res){
      if(res.data.status){
        that.setData({
          isShen:true
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  toHome:function(e){
    wx.switchTab({
      url: '../index/index',
    })
  },
  service:function(){
   
  },
  close:function(e){
    this.setData({
      showService: true
    })
  },
  showJuan:function(e){
    var that = this;
    if(that.data.isShen){
      return false;
    }
    var condition = {
      click_url: e.currentTarget.dataset.click_url,
      pict_url: e.currentTarget.dataset.pict_url,
      title: e.currentTarget.dataset.title,
      member_id: wx.getStorageSync('member_id') 
    };

    http.httpPost('command', condition, wx.getStorageSync('token'), function(res){
      that.setData({
        command: res.data.command
      });
      that.setData({
        showJuan: false
      })
    });
  },
  closeJuan:function(e){
    this.setData({
      showJuan: true
    })
  },

  /**
   * 获取商品详情 - 20180112 - LQ
   */
  getProductDetail: function(options){
    var that = this;
    that.setData({
      goodsType: options.type
    });
    http.httpGet('productInfo', { 
         id: options.id, 
         product_type	: options.type,
      }, wx.getStorageSync('token'),function (res) {
      that.setData({
        goodsDetail: res.data
      });
    });
  },

  /**
   * 一键复制淘口令 - 20180115 - LQ
   */
  copyCommand: function(){
    var that = this;
    var goodsDetail = that.data.goodsDetail;
    var condition = {
      product_type: 1,
      money: goodsDetail.zk_final_price.rmb + '.' + goodsDetail.zk_final_price.corner,
      coupon_number: goodsDetail.coupon_number,
      num_iid: goodsDetail.id,
      title: goodsDetail.title,
      shop_title: goodsDetail.shop_title,
      click_url: goodsDetail.click_url
    };
    if(that.data.isShare){ //该商品为分享商品
       //记录 用户领券信息
      condition.share_member = that.data.shareMember;
    }
    http.httpPost('recordCouponNotes', condition, wx.getStorageSync('token'), function (res) {});
    wx.setClipboardData({
      data: that.data.command,
      success: function (res) {
        // wx.showModal({
        //   content: '复制成功,请打开淘宝购买商品',
        //   showCancel: false,
        //   success:function(result){
        //     if(result.confirm){
        //       that.setData({
        //         showJuan : true
        //       });
        //     }
        //   }
        // })
      }
    })
  },
  toUpdate:function(){
    wx.navigateTo({
      url: '../update/update',
    })
  }
})