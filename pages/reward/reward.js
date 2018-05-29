// pages/reward/reward.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModel:true,
    showReward:false,
    showRule:true,
      time:"20:22:00",
      precent:'50',
      goods: [
          {
          id: 1,
          pict_url: '../../images/empty_img.png',
          title: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品',
          coupon_number: '100',
          zk_final_price: {
            rmb: '99',
            corner: '99'
          },
        },
          {
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
  },
  closeModel:function(){
      this.setData({
        showModel: true,
      })
  },
  showRule:function(){
    this.setData({
      showRule: false,
    })
  },
  closeRule: function () {
    this.setData({
      showRule: true,
    })
  },
  closeReward:function(){
    this.setData({
      showReward: true,
    })
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