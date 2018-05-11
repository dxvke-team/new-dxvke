// pages/superBenefit/superBenefit.js
var http = require('../../utils/httpHelper.js')
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  /**
   * 页面的初始数据
   */
  data: {
    toView: 'red',
    scrollTop: 100,
    nine_banner:{},     //9.9banner图
    nine_goods:[],      //9.9商品列表
    nineteen_banner:{}, //19.9banner图
    nineteen_goods:[],  //19.9商品列表
    discount_banner:{}, //聚折扣banner图
    discount_goods:[],  //聚折扣商品列表
    season_banner:{},   //应季必备banner图
    season_goods:[],    //应季必备商品列表
  },

  //加载数据 - 20180105 - LQ
  onLoad : function()
  {
    var that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    http.httpPost('c_index_nine',{
      member_id: wx.getStorageSync('member_id') 
    },function(res){
        that.setData({
          nine_banner : res.data.type,
          nine_goods : res.data.goods
        });
    });

    http.httpPost('c_index_nineteen',{
      member_id: wx.getStorageSync('member_id') 
    },function(res){
        that.setData({
          nineteen_banner: res.data.type,
          nineteen_goods: res.data.goods
        });
    });

    http.httpPost('c_index_season', {
      member_id: wx.getStorageSync('member_id') 
    }, function (res) {
      that.setData({
        season_banner: res.data.type,
        season_goods: res.data.goods
      });
    });

    http.httpPost('c_index_discount', {
      member_id: wx.getStorageSync('member_id') 
    }, function (res) {
      that.setData({
        discount_banner: res.data.type,
        discount_goods: res.data.goods
      });
    });
  },


  upper: function (e) {
  },
  lower: function (e) {
  },
  scroll: function (e) {
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  toSubject:function(e){
    wx.navigateTo({
      url: '../subject/subject?type_id=' + e.currentTarget.dataset.type,
    })
  },
  toDiscount:function(e){
    wx.navigateTo({
      url: '../discount/discount',
    })
  },
  toEssential: function (e) {
    wx.navigateTo({
      url: '../essential/essential',
    })
  },
  toTop: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },

  toGoodsDetail: function(e)
  {
    var goods_id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id=' + goods_id + '&type=' + type,
    })
  }
})