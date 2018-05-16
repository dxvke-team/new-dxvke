// pages/taobao/taobao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [{
      id: 1,
      pict_url: '../../images/empty_img.png',
      title: '商品名称',
      coupon_number: '100',
      zk_final_price: {
        rmb: '99',
        corner: '99'
      },

    }, {
      id: 1,
      pict_url: '../../images/empty_img.png',
      title: '商品名称',
      coupon_number: '100',
      zk_final_price: {
        rmb: '99',
        corner: '99'
      },

    }
    ],
    currentTab:0,
    sort: 0,
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var that = this
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      that.setData({
        currentTab: cur,
      })
    }
    that.setData({
      sort: 0,
    })
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  // 价格按钮
  swichPice: function () {
    this.setData({
      currentTab: 3,
    })
    if (this.data.sort == 1) {
      console.log('bb')
      this.setData({
        sort: 2,
      })
    } else {
      this.setData({
        sort: 1,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})