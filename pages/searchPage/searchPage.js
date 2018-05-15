// pages/searchPage/searchPage.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    focus:true,
    currentTab: 0, //预设当前项的值
    type:0,
    scrollLeft: 0, //tab标题的滚动条位置
    historyWords: [], //历史搜索词 - LQ
    keywords:'',
  },
  // 点击标题切换当前页时改变样式
  swichTab: function (e) {
    var that = this;
    var cur = e.currentTarget.dataset.current;
    if (this.data.type == cur) { return false; }
    else {
      that.setData({
        type: cur
      });
      // that.getOrderList();
    }
  },
  onLoad: function () {
    var that = this;
    that.getHistoryWords()
  },
  // 清空搜索历史 - 20180109 - LQ
  clearHistory:function(){
    var that = this;
    http.httpPost('delSearch',{
      member_id: wx.getStorageSync('member_id') 
    },function(res){
      if(res.code == 200){
        that.setData({
          historyWords : []
        });
      }
      else
      {
        return false;
      }
    });
  },
  getHistoryWords:function(){
    var that = this
    // 历史搜索词 - 20180109 - LQ
    http.httpPost('searchPage', {
      member_id: wx.getStorageSync('member_id') 
    }, function (res) {
      that.setData({
        historyWords: res.data.history
      });
    });
  },
  getGoodsList1:function(){
    var that = this
    console.log(that.data.keywords)
    http.httpPost('doSearch', {
      keywords: that.data.keywords,
      sort: 9,
      page:that.data.page1,
      limit:that.data.limit,
      member_id: wx.getStorageSync('member_id') 
    }, function (res) {
      var goodsList1 = that.data.goodsList1.concat(res.data.product_list)
      that.setData({
        goodsList1: goodsList1,
      });
      wx.hideLoading();
    });
  },
  getGoodsList2: function () {
    var that = this
    http.httpPost('doSearch', {
      keywords: that.data.keywords,
      sort: 10,
      page: that.data.page2,
      limit: that.data.limit,
      member_id: wx.getStorageSync('member_id') 
    }, function (res) {
      var goodsList2 = that.data.goodsList2.concat(res.data.product_list)
      that.setData({
        goodsList2: goodsList2,
      });
      wx.hideLoading();
    });
  },
  getGoodsList3: function () {
    var that = this
    http.httpPost('doSearch', {
      keywords: that.data.keywords,
      sort: 11,
      page: that.data.page3,
      limit: that.data.limit,
      member_id: wx.getStorageSync('member_id') 
    }, function (res) {
      var goodsList3 = that.data.goodsList3.concat(res.data.product_list)
      that.setData({
        goodsList3: goodsList3,
      });
      wx.hideLoading();
    });
  },
  // 获取焦点事件
  bindfocus:function(e){
    this.setData({ show: true });
  },
  // 开始搜索
  bindconfirm:function(e){
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var that = this;
    //搜索商品 - 20180109 - LQ
    if (e.currentTarget.dataset.key){
      var searchWord = e.currentTarget.dataset.key;
      that.setData({
        show: false,
        keywords: searchWord,
        goodsList1: [], //搜索结果 - LQ
        goodsList2: [],
        goodsList3: [],
        page1: 1,
        page2: 1,
        page3: 1
      })
      that.getGoodsList1()
      that.getGoodsList2()
      that.getGoodsList3()
    }else{
      var searchWord = e.detail.value
      that.setData({
        show: false,
        keywords: searchWord,
        goodsList1: [], //搜索结果 - LQ
        goodsList2: [],
        goodsList3: [],
        page1: 1,
        page2: 1,
        page3: 1
      })
      that.getGoodsList1()
      that.getGoodsList2()
      that.getGoodsList3()
    }
   
  },
  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  onPullDownRefresh: function () {
    console.log("下拉")
    this.setData({
      goodsList1: [], //搜索结果 - LQ
      goodsList2: [],
      goodsList3: [],
      scrollTop: 0,
      page1: 1,
      page2: 1,
      page3: 1
    });
    this.getGoodsList1()
    this.getGoodsList2()
    this.getGoodsList3()
  },
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this
    if(that.data.currentTab==9){
      var page = this.data.page1 + 1
      this.setData({
        page1: page,
      })
      that.getGoodsList1()
     
    } else if (that.data.currentTab == 10){
      var page = this.data.page2 + 1
      this.setData({
        page2: page,
      })
      that.getGoodsList2()
     
    }else{
      var page = this.data.page3 + 1
      this.setData({
        page3: page,
      })
      that.getGoodsList3()
    }
  },
  toTop: function () {
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  toGoodsDetail: function(e){
    var goods_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id=' + goods_id+'&type=2',
    })
  },
  toSearch:function(){
    wx.navigateTo({
      url: '../searchReasult/searchReasult',
    })
  }
})