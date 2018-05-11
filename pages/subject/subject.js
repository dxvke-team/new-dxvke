// pages/subject/subject.js
// var app = getApp();
var http = require('../../utils/httpHelper.js');
Page({
  data: {
    winHeight: "",//窗口高度
    scrollLeft: 0, //tab标题的滚动条位置
    page1: 1,
    page2: 1,
    page3: 1,
    page4: 1,
    limit:10,
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    sortList:[], //排序方式 - LQ
    goodsList1:[], //商品列表
    goodsList2: [], //商品列表
    goodsList3: [], //商品列表
    goodsList4: [], //商品列表
    type_id:'',
    scrollTop:0,
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var that = this;
    that.setData({
      type_id: options.type_id
    })
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 40*rpxR;
        that.setData({
          winHeight: calc
        });
      }
    });
    //排序方式 - 20180108 - LQ
    http.httpPost('nine_sort', {
      member_id: wx.getStorageSync('member_id') 
    },function(res){
      that.setData({
        sortList: res.data.sorts_type,

      });
      
    });
    that.getGoodsList1()
    that.getGoodsList2()
    that.getGoodsList3()
    that.getGoodsList4()
  },
  //商品列表 - 20180108 - LQ
  getGoodsList1: function (){
    var that = this;
    http.httpPost('nine', { sort: 1, type_id: that.data.type_id, page: that.data.page1, limit: that.data.limit, member_id: wx.getStorageSync('member_id')  }, function (res) {
      var goodsList1 = that.data.goodsList1.concat(res.data.nine_products)
      that.setData({
        goodsList1: goodsList1
      });
      wx.hideLoading();
    });
  },
  //商品列表 - 20180108 - LQ
  getGoodsList2: function () {
    var that = this;
    http.httpPost('nine', { sort: 2, type_id: that.data.type_id, page: that.data.page2, limit: that.data.limit, member_id: wx.getStorageSync('member_id')  }, function (res) {
      var goodsList2 = that.data.goodsList2.concat(res.data.nine_products)
      that.setData({
        goodsList2: goodsList2
      });
      wx.hideLoading();
    });
  },
  //商品列表 - 20180108 - LQ
  getGoodsList3: function () {
    var that = this;
    http.httpPost('nine', { sort: 3, type_id: that.data.type_id, page: that.data.page3, limit: that.data.limit, member_id: wx.getStorageSync('member_id')  }, function (res) {
      var goodsList3 = that.data.goodsList3.concat(res.data.nine_products)
      that.setData({
        goodsList3: goodsList3
      });
      wx.hideLoading();
    });
  },
  //商品列表 - 20180108 - LQ
  getGoodsList4: function () {
    var that = this;
    http.httpPost('nine', { sort: 4, type_id: that.data.type_id, page: that.data.page4, limit: that.data.limit, member_id: wx.getStorageSync('member_id')  }, function (res) {
      var goodsList4 = that.data.goodsList4.concat(res.data.nine_products)
      that.setData({
        goodsList4: goodsList4
      });
      wx.hideLoading();
    });
  },

  /**
   * 跳转商品详情 - 20180115 - LQ
   */
  toGoodsDetail:function(e){
    var goods_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id='+goods_id,
    })
  },
  onPullDownRefresh: function () {
    var that = this
    this.setData({
    
      goodsList1: [], //抢购商品
      goodsList2: [], //抢购商品
      goodsList3: [], //抢购商品
      goodsList4: [], //抢购商品
      page1: 1, //页码
      page2: 1,
      page3: 1,
      page4: 1,
      limit: 10, //每页显示条数
    });
    //抢购商品 - 20180108 - LQ
    that.getGoodsList1();
    that.getGoodsList2();
    that.getGoodsList3();
    that.getGoodsList4();
    wx.stopPullDownRefresh()
  },
  lower: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var cur = this.data.currentTab
    console.log(cur)
    switch (cur) {
      case 0:
        var page1 = this.data.page1 + 1
        var that = this
        this.setData({
          page1: page1
        })
        that.getGoodsList1();
        break;
      case 1:
        var page2 = this.data.page2 + 1
        var that = this
        this.setData({
          page2: page2
        })
        that.getGoodsList2();
        break;
      case 2:
        var page3 = this.data.page3 + 1
        var that = this
        this.setData({
          page3: page3
        })
        that.getGoodsList3();
        break;
      case 3:
        var page4 = this.data.page4 + 1
        var that = this
        this.setData({
          page4: page4
        })
        that.getGoodsList4();
        break;
    }
  },
  toTop: function () {
    this.setData({
      scrollTop: 0
    })
  },
  
})