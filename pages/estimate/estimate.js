// pages/estimate/estimate.js
// var app = getApp();
var http = require('../../utils/httpHelper.js');
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    page1:1,
    page2:1,
    limit:20,
    list1:[],
    list2:[],
    loadingShow:true,
    scrollTop:0,
  },
  // 获取收入列表
  getlist1: function () {
    var that = this
    http.httpGet('transPortList', { page: that.data.page1, limit: that.data.limit, type:1}, wx.getStorageSync('token'), function (res) {
      var list1 = that.data.list1.concat(res.data.list)
      that.setData({
        loadingShow: true,
        list1: list1,

      });
      wx.hideLoading();
      wx.stopPullDownRefresh()
    })
  },
  // 获取收入列表
  getlist2: function () {
    var that = this
    http.httpGet('transPortList', { page: that.data.page2, limit: that.data.limit, type: 2 }, wx.getStorageSync('token'), function (res) {
      var list2 = that.data.list2.concat(res.data.list)
      that.setData({
        loadingShow: true,
        list2: list2,

      });
      wx.hideLoading();
      wx.stopPullDownRefresh()
    })
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
    var that = this;
    var cur = Number(e.currentTarget.dataset.current)
    if (this.data.currentTaB == cur) { return false; }
    else {
      that.setData({
        currentTab: cur
      });
      // that.getOrderList();
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
  lower: function (e) {
    var cur = this.data.currentTab
    // console.log(typeof cur)  判断数据类型
    var that = this
    switch (cur) {
      case 0:
        var page1 = this.data.page1 + 1
        this.setData({
          page1: page1,
          loadingShow: false,
        })
        that.getlist1();
        break;
      case 1:
        var page2 = this.data.page2 + 1
        this.setData({
          page2: page2,
          loadingShow: false,
        })
        that.getlist2();
        break;
    }
  },
  onLoad: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        that.setData({
          winHeight: calc
        });
      }
    });
    this.getlist1()
    this.getlist2()
  },


  toTop: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
 onPullDownRefresh: function () {
   if (this.data.currentTab==0){
     this.setData({
       page1:1,
       list1:[]
     })
     this.getlist1()
   }else{
     this.setData({
       page2: 1,
       list2: []
     })
     this.getlist2()
   }
 }
})