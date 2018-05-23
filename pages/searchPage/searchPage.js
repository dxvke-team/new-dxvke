// pages/searchPage/searchPage.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus:true,
    type:0,
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
    http.httpPost('delSearchHistory', {},wx.getStorageSync('token') ,function(res){
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
    http.httpGet('searchHistory', {}, wx.getStorageSync('token') , function (res) {
      that.setData({
        historyWords: res.data
      });
    });
  },
  bindconfirm:function(e){
    var self = this
    if (e.currentTarget.dataset.key){
      wx.navigateTo({
        url: '../searchReasult/searchReasult?keywords=' + e.currentTarget.dataset.key+'&type='+self.data.type,
      })
    } else if (e.detail.value){
      wx.navigateTo({
        url: '../searchReasult/searchReasult?keywords=' + e.detail.value + '&type=' + self.data.type,
      })
    }else if(self.data.keywords){
      wx.navigateTo({
        url: '../searchReasult/searchReasult?keywords=' + self.data.keywords + '&type=' + self.data.type,
      })
    }
   
    
  },
  keywordsInput:function(e){
    this.setData({
      keywords:e.detail.value
    })
  }
})