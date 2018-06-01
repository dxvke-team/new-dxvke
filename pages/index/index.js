//index.js
var config = require('../../config.js');
var http = require('../../utils/httpHelper.js');
var login = require('../../utils/login.js');
//获取应用实例
const app = getApp()
wx.showShareMenu({
  withShareTicket: true
})

Page({
  data: {
    imgUrls: [], //banner图
    goods:[], //商品列表
    goods_type: [],//商品分类   
    currentType:0,
    cate_type_id:'',
    tabList:[
      {
        img:'../../images/index/taobao.png',
        img2:'../../images/index/taobao_active.png',
        name:'淘宝',
        product_type:0
      },
      {
        img: '../../images/index/JD.png',
        img2: '../../images/index/JD_active.png',
        name: '京东',
        product_type : 2
      },
      {
        img: '../../images/index/pin.png',
        img2: '../../images/index/pin_active.png',
        name: '拼多多',
        product_type : 1
      },
    ],//淘宝，京东，拼多多
    currentTab:0,//选中的
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    page:1,
    limit:10,
    scrollTop:0,
    loadingShow:true,
    scroll_height:'',
    height:'',
    token:'',
    login:true,
  },
  // //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function (options) {
    if(options.share_query==1){
      setTimeout(function () {
        wx.hideLoading()
        wx.navigateTo({
          url: '../reward/reward?is_share=1&id=' + options.id + '&type=' + options.type + '&share_member=' + options.share_member+'&photo='+options.photo,
        })
      }, 500)
    }
    var that=this
    var query=wx.createSelectorQuery()
    //选择id
    query.select('#banner').boundingClientRect()
    query.exec(function (res) {
      //取高度
      that.setData({
        height: res[0].height
      });
    })
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    var that = this;
    if (options.is_share) {
      var pid = options.share_member;
    } else if (options.scene) {
      var pid = decodeURIComponent(options.scene);
    } else {
      var pid = '';
    }
    that.setData({
      pid : pid
    });

    login.login(options,function(res){
      if(res){
        that.setData({
          token : res
        });
        that.getBanner()
        that.getGoodsType()
        that.getGoods() 
      }else{
        that.setData({
          login : false
        });
      }
    });
  },
  onShow : function(){
    var that = this;
    that.getGoods()  
  },
  onHide : function(){
    var that = this;
    that.setData({
      goods : []
    });
  },
  onShareAppMessage: function (res) {
    return {
      title: '洞悉微客',
      path: 'pages/index/index?is_share=1&share_member='+wx.getStorageSync('member_id'),
      imageUrl : '../../images/indexShare.jpg',
      success: function (res) {
        // 转发成功
        wx.showModal({
          content: '转发成功',
          showCancel: false,
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showModal({
          content: '转发失败',
          showCancel: false,
        })
      }
    }
  },
  //首页banner
  getBanner:function(){
    var that = this
    http.httpGet("indexBanner", {type:10}, wx.getStorageSync('token'),function (res) {
      that.setData({
        imgUrls: res.data
      });
    });
  },
   //首页商品 
  getGoods:function(cur){
    var that = this
    var data={}
    if(cur){
      data = { page: that.data.page, limit: that.data.limit, product_type: cur, cate_type: that.data.cate_type_id }
    }else{
      data = { page: that.data.page, limit: that.data.limit, product_type: that.data.currentTab, cate_type: that.data.cate_type_id }
    }
    
    http.httpGet('productList', data, wx.getStorageSync('token'), function (res) {
      if(res.data.list.length!==0){
        var goods = that.data.goods.concat(res.data.list)
        that.setData({
          goods: goods,
          loading: true,
        });
      }else{

      }
      // wx.hideLoading();
    })

  },
   //首页分类
  getGoodsType:function(cur){
    var that = this
    var data={}
    if(cur){
      data = { type: cur }
    }else{
      data = { type: that.data.currentTab }
    }
    http.httpGet('productCateList', data, wx.getStorageSync('token'),function (res) {
      that.setData({
        goods_type: res.data,
        cate_type_id:res.data[0].id
      });
    });
  },
  
  toSearch:function(e){
    wx.navigateTo({
      url: "../searchPage/searchPage",
    })
  },
  
  toGoodsDetail:function(e){
    var self = this
    if(this.data.currentTab==0){
      wx.navigateTo({
        url: "../goodsDetail/goodsDetail?id=" + e.currentTarget.dataset.id + '&type=' + self.data.currentTab
      })
    } else if (this.data.currentTab == 2){
      wx.navigateTo({
        url: "../JDdetail/JDdetail?id=" + e.currentTarget.dataset.id + '&type=' + self.data.currentTab
      })
    }else{
      wx.navigateTo({
        url: "../pinDetail/pinDetail?id=" + e.currentTarget.dataset.id + '&type=' + self.data.currentTab
      })
    }
    
  },
  bindDownLoad:function(){
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true,
    // })
    var page = this.data.page + 1
    this.setData({
      page: page,
      loadingShow: false,
    })
    this.getGoods()
  },
  toTop: function () {
    this.setData({
      scrollTop: 0
    })
  },
  refresh:function(){
    if (this.data.scroll_height<'-10'){
      this.setData({
        imgUrls: [], //banner图
        goods: [], //商品列表
        goods_type: [], //商品分类
        scrollTop: 0,
        page: 1
      });
      this.getBanner()
      this.getGoods()
      this.getGoodsType()
      wx.stopPullDownRefresh()
    }
   
  },
  onPullDownRefresh: function () {
    this.setData({
      imgUrls: [], //banner图
      goods: [], //商品列表
      goods_type: [], //商品分类
      scrollTop: 0,
      page: 1
    });
    this.getBanner()
    this.getGoods()
    this.getGoodsType()
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {
    
  },

  //banner跳转
  clickBanner: function(e){
    var url = '../' +e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },
  swichNav: function (e) {
    var that = this
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { 
      return false; 
      }
    else {
      this.setData({
        currentTab: cur,
        currentType:0,
        cate_type_id:'',
        goods:[],
        page:1,
      });
      that.getGoodsType(cur)
      that.getGoods(cur)
    }
    
  },
  swichType: function (e) {
    var that = this
    var cur = e.currentTarget.dataset.current;
    var id = e.currentTarget.dataset.id
    if (this.data.currentType == cur) {
      return false;
    }else {
      this.setData({
        currentType: cur,
        cate_type_id:id,
        goods: [],
        page:1,
      });
      that.getGoods()
    }
  },
  scroll:function(e){
    this.setData({
      scroll_height:e.detail.scrollTop
    })
  },

  cancelInfo: function () {
    var that = this;
    that.setData({
      login:true
    })
    that.getBanner()
    that.getGoodsType()
    that.getGoods() 
  },

/**
 * 用户点击授权信息
 */
  userInfoHandler: function (res) {
    var that = this;
    var userInfo = res.detail;
    that.data.pid = 304;
    login.userInfoHandler(userInfo, that.data.pid,function(res){
      if(res == undefined){
        return false;
      }else{
        that.setData({
          login: true,
          token: res
        });
        that.getBanner()
        that.getGoodsType()
        that.getGoods()
      }
    });
  }
})

