// pages/rewardList/rewardList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:"12:22:00",
    currentTab:0,
    tabList: [
      {
        img: '../../images/find/self.png',
        img2: '../../images/find/self_active.png',
        name: '我的打赏',
        type: 0
      },
      {
        img: '../../images/find/shang.png',
        img2: '../../images/find/shang_active.png',
        name: '打赏商品',
        type: 1
      }
    ],
     infoList:[
       {
         info:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或哈奥奥奥奥哈哈哈哈哈哈哈'
       },
       {
         info: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或哈奥奥奥奥哈哈哈哈哈哈哈'
       },
       {
         info: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或哈奥奥奥奥哈哈哈哈哈哈哈'
       },
       {
         info: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或哈奥奥奥奥哈哈哈哈哈哈哈'
       },
     ],
     goods:[
         {
      id: 1,
      pict_url: '../../images/empty_img.png',
      title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
      coupon_number: '100',
      zk_final_price: {
        rmb: '1999',
        corner: '99'
      },
    },
         {
           id: 1,
           pict_url: '../../images/empty_img.png',
           title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
           coupon_number: '100',
           zk_final_price: {
             rmb: '1999',
             corner: '99'
           },
         },
         {
           id: 1,
           pict_url: '../../images/empty_img.png',
           title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
           coupon_number: '100',
           zk_final_price: {
             rmb: '1999',
             corner: '99'
           },
         },
         {
           id: 1,
           pict_url: '../../images/empty_img.png',
           title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
           coupon_number: '100',
           zk_final_price: {
             rmb: '1999',
             corner: '99'
           },
         },
     ],
     winHeight: '',
     scrollTop: 0,
  },
  swichTab:function(e){
    var that = this
    var cur = e.currentTarget.dataset.current;
    console.log(cur)
    if (this.data.currentTab == cur) {
      return false;
    }
    else {
      this.setData({
        currentTab: cur
      });
      // that.getGoodsType(cur)
      // that.getGoods(cur)
    }

  },
  toReward:function(e){
      wx.navigateTo({
        url: '../reward/reward',
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
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