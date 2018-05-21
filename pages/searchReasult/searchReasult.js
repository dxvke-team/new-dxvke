// pages/searchResault/searchReasult.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    keywords:'',
    type:'',
    sorts:'',
    goodsList1: [
    //   {
    //   id:'1',
    //   pict_url:'../../images/find/JD.png',
    //   title:'这个是商品名称',
    //   coupon_number:2,
    //   reserve_price:{
    //     rmb:'2',
    //     corner:'33'
    //   },
    //   zk_final_price:{
    //     rmb: '1',
    //     corner: '33'
    //   },
    //   share_commission:'22'
    // }
    ], //搜索结果 - LQ
    goodsList2: [],
    goodsList3: [],
    goodsList4: [],
    page1: 1,
    page2: 1,
    page3: 1,
    page4: 1,
    limit: 20,
    scrollTop: 0,
    token:'',
    winHeight: "",//窗口高度
    loadingShow:true,
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
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
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var that = this
    var cur = e.currentTarget.dataset.current; 
    that.setData({
        currentTab: cur,
        sorts: '',
      })
  },
  // 价格按钮
  swichPice:function(){
     if(this.data.sorts==1){
       this.setData({
         sorts: 2,
         currentTab: 3,
         goodsList4: [],
         page4: 1
       })
       this.getGoodsList4()
     }else{
       this.setData({
         sorts: 1,
         currentTab: 3,
         goodsList4: [],
         page4: 1
       })
       this.getGoodsList4()
     }
     
  },
  getGoodsList1: function () {
    var that = this
    http.httpGet('searchProduct', {
      keywords: that.data.keywords,
      product_type:that.data.type,
      order: 0,
      sorts: that.data.sorts,
      page: that.data.page1,
      limit: that.data.limit,
    }, wx.getStorageSync('token'),function (res) {
      var goodsList1 = that.data.goodsList1.concat(res.data.list)
      that.setData({
        goodsList1: goodsList1,
        loadingShow: true
      });
      wx.hideLoading();
    });
  },
  getGoodsList2: function () {
    var that = this
    http.httpGet('searchProduct', {
      keywords: that.data.keywords,
      product_type: that.data.type,
      order: 1,
      sorts: that.data.sorts,
      page: that.data.page2,
      limit: that.data.limit,
    }, wx.getStorageSync('token'), function (res) {
      var goodsList2 = that.data.goodsList2.concat(res.data.list)
      that.setData({
        goodsList2: goodsList2,
        loadingShow: true
      });
      wx.hideLoading();
    });
  },
  getGoodsList3: function () {
    var that = this
    http.httpGet('searchProduct', {
      keywords: that.data.keywords,
      product_type: that.data.type,
      order: 2,
      sorts: that.data.sorts,
      page: that.data.page3,
      limit: that.data.limit,
    }, wx.getStorageSync('token'), function (res) {
      var goodsList3 = that.data.goodsList3.concat(res.data.list)
      that.setData({
        goodsList3: goodsList3,
        loadingShow: true
      });
      wx.hideLoading();
    });
  },
  getGoodsList4: function () {
    var that = this
    http.httpGet('searchProduct', {
      keywords: that.data.keywords,
      product_type: that.data.type,
      order: 3,
      sorts: that.data.sorts,
      page: that.data.page4,
      limit: that.data.limit,
    }, wx.getStorageSync('token'), function (res) {
      var goodsList4 = that.data.goodsList4.concat(res.data.list)
      that.setData({
        goodsList4: goodsList4,
        loadingShow: true
      });
      wx.hideLoading();
    });
  },
  // 获取焦点事件
  bindfocus: function (e) {
    wx.navigateBack({})
  },
  lower: function (e) {
    var cur = this.data.currentTab
    switch (cur) {
      case 0:
        var page1 = this.data.page1 + 1
        var that = this
        this.setData({
          page1: page1,
          loadingShow: false
        })
        that.getGoodsList1();
        break;
      case 1:
        var page2 = this.data.page2 + 1
        var that = this
        this.setData({
          page2: page2,
          loadingShow: false
        })
        that.getGoodsList2();
        break;
      case 2:
        var page3 = this.data.page3 + 1
        var that = this
        this.setData({
          page3: page3,
          loadingShow: false
        })
        that.getGoodsList3();
        break;
      case 3:
        var page4 = this.data.page4 + 1
        var that = this
        this.setData({
          page4: page4,
          loadingShow: false
        })
        that.getGoodsList4();
        break;
    }
  },
  toTop: function () {
    var that = this
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = -144 * rpxR;
        that.setData({
          scrollTop: calc
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self =this
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR;
        self.setData({
          winHeight: calc,

        });
      }
    });  
    self.setData({
      keywords: options.keywords,
      type: options.type
    });
    self.getGoodsList1()
    self.getGoodsList2()
    self.getGoodsList3()
    
    wx.hideLoading();
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
    var cur = this.data.currentTab
    switch (cur) {
      case 0:
        var page1 = this.data.page1 + 1
        var that = this
        this.setData({
          page1: page1,
          loadingShow: false
        })
        that.getGoodsList1();
        break;
      case 1:
        var page2 = this.data.page2 + 1
        var that = this
        this.setData({
          page2: page2,
          loadingShow: false
        })
        that.getGoodsList2();
        break;
      case 2:
        var page3 = this.data.page3 + 1
        var that = this
        this.setData({
          page3: page3,
          loadingShow: false
        })
        that.getGoodsList3();
        break;
      case 3:
        var page4 = this.data.page4 + 1
        var that = this
        this.setData({
          page4: page4,
          loadingShow: false
        })
        that.getGoodsList4();
        break;
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})