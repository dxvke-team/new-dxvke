// pages/rewardList/rewardList.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page1:1,
    page2:1,
    limit:20,
    loadingShow:true,
    banner:{
      image:'',
      click_url:''
    },
    time:"12:22:00",
    currentTab:0,
    tabList: [
      {
        img: '../../images/find/shang.png',
        img2: '../../images/find/shang_active.png',
        name: '打赏商品',
        type: 0
      },
      {
        img: '../../images/find/self.png',
        img2: '../../images/find/self_active.png',
        name: '我的打赏',
        type: 1
      }
    ],
    infoList:[],
    goods1:[],
    goods2:[],
    winHeight: '',
    scrollTop: 0,
    showModel:true,
    isShen:false,
  },
  swichTab:function(e){
    var that = this
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    }
    else {
      this.setData({
        currentTab: cur,
      });
      if(cur==1){
        that.setData({
          page2: 1,
          goods2: [],
        })
        this.getGoods2()
      }
    }

  },
  toReward:function(e){
    var id = e.currentTarget.dataset.id;
    var that=this
    this.doBargain(id,function(res){
      if(res.status==1){
          that.setData({
            showModel:false,
            bargain_id: res.bargain_id,
            money: res.money,
            status:res.status
          })
      }else if(res.status==0){
        wx.navigateTo({
          url: '../reward/reward?id=' + res.bargain_id + '&money=' + res.money + '&status=' + res.status,
        })
      }else if(res.status==2){
        // 打赏失败
        wx.showModal({
          content: '该商品已失效',
          showCancel: false,
        })
      }
    })
  },

  toBargainInfo : function(e){
    var id = e.currentTarget.dataset.id;;
    wx.navigateTo({
      url: '../reward/reward?id=' + id + '&status=1'
    })
  },

  // 执行砍价
  doBargain: function (id,cb) {
    var that = this
    // type=1为自己砍价，type=2为别人砍价
    http.httpPost("bargainDoBargain", { id: id, type: 1 }, wx.getStorageSync('token'), function (res) {
      typeof cb == "function" && cb(res.data);
    });
  },
  closeModel:function(){
    this.setData({
      showModel:true
    })
  },
  toSeek:function(){
    this.setData({
      showModel: true
    })
    wx.navigateTo({
      url: '../reward/reward?id=' + this.data.bargain_id + '&money=' + this.data.money + '&status=' +this.data.status,
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
    that.bargainMsg();
    that.getBanner()
    that.getGoods1()
    // this.getGoods2()
    http.httpPost('checkMiniShen', {}, wx.getStorageSync('token'), function (res) {
      if (res.data.status) {
        that.setData({
          isShen: true
        });
      }
    });
  },
  //砍价banner
  getBanner: function () {
    var that = this
    http.httpGet("bargainBanner", {}, wx.getStorageSync('token'), function (res) {
      that.setData({
        banner: res.data
      });
    });
  },

  //砍价消息列表
  bargainMsg: function(){
    var that = this;
    http.httpGet('bargainMsg',{},wx.getStorageSync('token'),function(res){
      if(res.code == 200){
        that.setData({
          infoList : res.data
        });
      }
    })
  },

  //打赏商品 
  getGoods1: function () {
      var that=this
      http.httpGet('bargainProductList', { page: that.data.page1, limit: that.data.limit }, wx.getStorageSync('token'), function (res) {
      if (res.data.list.length !== 0) {
        var goods1 = that.data.goods1.concat(res.data.list)
        that.setData({
          goods1: goods1,
          loading: true,
        });
      } else {

      }
      // wx.hideLoading();
    })

  },
  // 我的打赏商品列表
  getGoods2: function () {
    var that = this
   
    http.httpGet('myBargainList', { page: that.data.page2, limit: that.data.limit }, wx.getStorageSync('token'), function (res) {
      if (res.data.list.length !== 0) {
        var goods2 = res.data.list
        that.setData({
          goods2: goods2,
          loading: true,
        });
        var timer = setInterval(function () { 
        
          for (var i in goods2) {
            if (goods2[i].surplus_time > 0){
              that.doTiming(goods2[i].surplus_time,function(hour,minute,second){
                var surplusHour = 'goods2['+i+'].surplus_hour';
                var surplusMinute = 'goods2['+i+'].surplus_minute';
                var surplusSecond = 'goods2['+i+'].surplus_second';
                that.setData({
                  [surplusHour]: hour,
                  [surplusMinute]: minute,
                  [surplusSecond]: second
                });
                
              });
            }
            goods2[i].surplus_time--;
          }
        }, 1000);
      } 
      // wx.hideLoading();
    })

  },

  doTiming: function (surplus_time,cb)
  {
    self = this;
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0;//时间默认值
      
          day = Math.floor(surplus_time / (60 * 60 * 24));
          hour = Math.floor(surplus_time / (60 * 60)) - (day * 24);
          minute = Math.floor(surplus_time / 60) - (day * 24 * 60) - (hour * 60);
          second = Math.floor(surplus_time) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
       
        if (surplus_time <= 0) {
          clearInterval(timer);
        }
        typeof cb == 'function' && cb(hour,minute,second);

  },

  lower: function (e) {
    var cur = this.data.currentTab
    console.log(typeof cur)  //判断数据类型
    var that = this
    switch (cur) {
      case 0:
        if (that.data.noData1) {
          return false
        } else {
          var page1 = this.data.page1 + 1
          this.setData({
            page1: page1,
            loadingShow: false,
          })
          that.getGoods1();
        }
        break;
      case 1:
        if (that.data.noData2) {
          return false
        } else {
          var page2 = this.data.page2 + 1
          this.setData({
            page2: page2,
            loadingShow: false,
          })
          that.getGoods2();
        }
        break;
    }
  },
  toQuan:function(e){
    var that = this
    var id = e.currentTarget.dataset.id
    http.httpGet('bargainSuccessGetCoupon', {id:id}, wx.getStorageSync('token'), function (res) {
     if(res.code==200){
        if (!that.data.isShen) {
         wx.navigateToMiniProgram({
           appId: res.data.pdd_app_id,
           path: res.data.pdd_mini_url,
           extraData: {
             userId: wx.getStorageSync('member_id')
           },
           // envVersion: 'develop',
           success(res) {
           }
         })
       }
     }
    })
  },
  toTop: function () {
    this.setData({
      scrollTop: 0
    })
  },
  rewardAgain:function(e){

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
  onShareAppMessage: function (res) {
    return {
      title: '洞悉微客',
      path: 'pages/index/index?share_query=1',
      // imageUrl: '../../images/indexShare.jpg',
      success: function (res) {
        // 转发成功
        wx.showModal({
          content: '转发成功',
          showCancel: false,
        })
      },
      fail: function (res) {
        // // 转发失败
        // wx.showModal({
        //   content: '转发失败',
        //   showCancel: false,
        // })
      }
    }
  }
})