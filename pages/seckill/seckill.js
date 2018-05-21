// pages/seckill/seckill.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//窗口高度
    status: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    scorllTop: 0,
    timeList: [{
      time: '8:00',
      status: 1,
    }], //抢购时间列表
    goodsList1: [], //抢购商品
    goodsList2: [], //抢购商品
    goodsList3: [], //抢购商品
    goodsList4: [], //抢购商品
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var that = this
    var cur = e.currentTarget.dataset.current;
    if (this.data.status == cur) { return false; }
    else {
      this.setData({
        status: cur,
      });
    }
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
  onLoad: function () {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true,
    // })
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    that.getTime()
    that.getGoods1();
    that.getGoods2();
    that.getGoods3();
    that.getGoods4();
  },

  //抢购时间
  getTime: function () {
    var that = this;
    http.httpGet('seckillTimeList',{},wx.getStorageSync('token'), function (res) {
      var timeList = res.data
      for (var index in timeList) {
        if (timeList[index]['status'] == 1) {
          var time = index;
        }
      }
      that.setData({
        timeList: timeList,
        currentTab: time
      });
    });

  },
  getGoods1: function () {
    var that = this;
    var condition = {
      time_index: 0,
    };
    http.httpGet('pddSeckillTotal', condition,wx.getStorageSync("token"), function (res) {
      that.setData({
        goodsList1: res.data
      });
      wx.hideLoading();
    });
  },
  getGoods2: function () {
    var that = this;
    var condition = {
      time_index: 1,
    };
    http.httpGet('pddSeckillTotal', condition, wx.getStorageSync("token"), function (res) {
      that.setData({
        goodsList2: res.data
      });
      wx.hideLoading();
    });
  },
  getGoods3: function () {
    var that = this;
    var condition = {
      time_index: 2,
    };
    http.httpGet('pddSeckillTotal', condition, wx.getStorageSync("token"),function (res) {
      that.setData({
        goodsList3: res.data
      });
      wx.hideLoading();
    });
  },
  getGoods4: function () {
    var that = this;
    var condition = {
      time_index: 3,
    };
    http.httpGet('pddSeckillTotal', condition, wx.getStorageSync("token"), function (res) {
      that.setData({
        goodsList4: res.data
      });
      wx.hideLoading();
    });
  },
  onPullDownRefresh: function () {
    var that = this
    this.setData({
      timeList: [], //抢购时间列表
      goodsList1: [], //抢购商品
      goodsList2: [], //抢购商品
      goodsList3: [], //抢购商品
      goodsList4: [], //抢购商品
    });
    that.getTime()
    that.getGoods1();
    that.getGoods2();
    that.getGoods3();
    that.getGoods4();
    wx.stopPullDownRefresh()
  },
  toTop: function () {
    var that = this
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = -88 * rpxR;
        that.setData({
          scrollTop: calc
        });
      }
    });
  },
  /**
   * 商品详情
   */
  toGoodsDetail: function (e) {
    var goods_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id=' + goods_id + '&type=1',
    })
  }
})