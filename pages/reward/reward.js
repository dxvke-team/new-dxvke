// pages/reward/reward.js
var config = require('../../config.js');
var http = require('../../utils/httpHelper.js');
var login = require('../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModel:true,
    showReward:true,
    showRule:true,
    login:true,
    selfShow:false,
    time:"",
    precent:'',
    id:'',
    page:1,
    limit:20,
    goods: [],
    detail:{},
    loadingShow:false,
    noData:false,
    scrollTop:0,
    animationData: {},
    pid : ''
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
  // 砍价商品详情
  getDetail: function (id) {
    var that = this
    http.httpGet("bargainProductInfo", {id:id}, wx.getStorageSync('token'), function (res) {
      console.log(res);
      var progress = res.data.bargain_count * 10
      that.setData({
        detail: res.data,
        progress: progress,
        time: res.data.surplus_time,
      });
      that.countDown(res.data.surplus_time)
    });
    
  },
  // 砍价打赏团列表
  getMemberList: function (id) {
    var that = this
    http.httpGet("bargainInfoMemberList", { id: id }, wx.getStorageSync('token'), function (res) {
      that.setData({
        memberList: res.data
      });
    });
  },
  //商品列表
  getGoods: function () {
    var that = this
    http.httpGet('bargainInfoProductList', {id:that.data.id, page: that.data.page, limit: that.data.limit }, wx.getStorageSync('token'), function (res) {
      var goods = that.data.goods.concat(res.data.list)
      if (res.data.list.length < that.data.limit) {
        that.setData({
          goods: goods,
          loadingShow: true,
          noData: true,
        });
      } else {
         that.setData({
           goods: goods,
           noData:false,
           loadingShow: true,
         })
      }
      // wx.hideLoading();
    });

    

  },
  // 执行砍价
  doBargain: function (type,cb) {
    var that = this
    // type=1为自己砍价，type=2为别人砍价
    http.httpPost("bargainDoBargain", { id: that.data.id,type:type}, wx.getStorageSync('token'), function (res) {
      typeof cb == "function" && cb(res.data);
    });
  },
  bindDownLoad:function(){
    if(this.data.noData){
      return false
    }else{
      var page = this.data.page + 1
      this.setData({
        page: page,
        loadingShow: false,
      })
      this.getGoods()
    }
  },
  //带天数的倒计时
  countDown: function (times) {
    var timer = null,
      self = this
    timer = setInterval(function () {
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0;//时间默认值
      if (times > 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - (day * 24);
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      }
      if (hour <= 9) hour = '0' + hour;
      if (minute <= 9) minute = '0' + minute;
      if (second <= 9) second = '0' + second;
      times--;
      self.setData({
        hour: hour,
        minute: minute,
        second: second,
        time:times
      })
      if (times <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    if (times <= 0) {
      clearInterval(timer);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    if(options.status==0){
      // 第一次砍价 显示弹框
      that.setData({
        showModel:false,
        money:options.money,
        id: options.id
      })
      this.getDetail(options.id)
      this.getGoods()
      this.getMemberList(options.id)
    }else if(options.status==1){
    //  查看详情 不显示弹框
      that.setData({
        showModel: true,
        id: options.id,
      })
      this.getDetail(options.id)
      this.getGoods()
      this.getMemberList(options.id)
    }
    if(options.type==2){
      this.setData({
        id: options.id,
        photo: options.photo,
      })
      this.getDetail(options.id)
      this.getMemberList(options.id)
      this.getGoods();
      if (options.is_share) {
        that.setData({
          pid: options.share_member
        });
      } 
      // 授权登录
      login.login(options, function (res) {
        if (res) {
          // 已经授权登录
          that.setData({
            token: res
          });
          wx.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function (res) {
                    that.setData({
                      avatarUrl: res.userInfo.avatarUrl,
                      name: res.userInfo.nickName
                    })
                    that.doBargain(2, function (res) {
                      console.log(res);
                       //打赏成功
                      if (res.status == 0) {
                        that.setData({
                          id: res.num_iid,
                        })
                        that.doBargain(1, function (res) {
                          if(res.status==0){
                            that.setData({
                              id: res.bargain_id,
                              money: res.money,
                              showReward:false,
                            })
                            that.getDetail(res.bargain_id)
                            that.getGoods()
                            that.getMemberList(res.bargain_id)
                          }else{

                          }
                          
                        })
                       
                      } else if (res.status == 1) {
                        //已经打赏
                        that.setData({
                          showReward: true,
                          id: res.bargain_id,
                          selfShow: true,
                          status:res.status
                        })
                        that.getDetail(res.bargain_id)
                        that.getGoods()
                        that.getMemberList(res.bargain_id)
                      } else if (res.status == 4) {
                        //打赏次数达上限
                        wx.showModal({
                          content: '您今日的助力打赏次数已达到上限',
                          showCancel: false,
                        })
                      }else if(res.status == 5) {

                      }else{
                        that.setData({
                          showReward: true,
                          selfShow: true,
                          status: res.status
                        })
                      }
                    })
                  }
                })
              }else{
                that.setData({
                  login: false
                });
              }
            }
          })
        } else {
          that.setData({
            login: false
          });
        }
      });
    }
  },

  toGoodsDetail: function(e){
    var id = e.currentTarget.dataset.id;
    var that = this
    that.setData({
      id : id
    });
    that.doBargain(1, function (res) {
      if (res.status == 0) {
        that.setData({
          showModel: false,
          id: res.bargain_id,
          money: res.money,
          scrollTop: 0
        })
        that.getDetail(res.bargain_id)
        that.getGoods()
        that.getMemberList(res.bargain_id)

      } else if (res.status == 1) {
        this.setData({
          scrollTop: 0
        })
        that.getDetail(res.bargain_id)
        that.getGoods()
        that.getMemberList(res.bargain_id)
      } else if (res.status == 2) {
        // 打赏失败
        wx.showModal({
          content: '该商品已失效',
          showCancel: false,
        })
      }
    })
  },

/**
* 用户点击授权信息
*/
  userInfoHandler: function (res) {
    var that = this;
    var userInfo = res.detail;
    login.userInfoHandler(userInfo,that.data.pid,function(res){
      if(res == undefined){
        return false;
      }else{
        that.setData({
          login: true,
          token: res,
          avatarUrl: userInfo.avatarUrl,
          name: userInfo.nickName
        });
        that.doBargain(2, function (res) {
          if (res.status == 0) {
            //打赏成功
            that.setData({
              id: res.num_iid,
            })
            that.doBargain(1, function (res) {
              if (res.status == 0) {
                that.setData({
                  id: res.bargain_id,
                  money: res.money,
                  showReward: false,
                })
                that.getDetail(res.bargain_id)
                that.getGoods()
                that.getMemberList(res.bargain_id)
              }
            })
          } else if (res.status == 1) {
            //已经打赏
            that.setData({
              showReward: true,
              id: res.bargain_id,
              selfShow: true,
              status: res.status
            })
            that.getDetail(res.bargain_id)
            that.getGoods()
            that.getMemberList(res.bargain_id)
          } else if (res.status == 4) {
            //打赏次数达上限
            // 转发失败
            wx.showModal({
              content: '您今日的助力打赏次数已达到上限',
              showCancel: false,
            })
          } else {
            that.setData({
              showReward: true,
              selfShow: true,
              status: res.status
            })
          }
        })
      }
    });
  },

  /**
   * 打赏成功领券
   */
  getCoupon : function(e){
    var that = this
    if (that.data.isShen) {
      return false;
    }
    var id = e.currentTarget.dataset.id
    http.httpGet('bargainSuccessGetCoupon', { id: id }, wx.getStorageSync('token'), function (res) {
      if (res.code == 200) {
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
    })
  },
  toTop: function () {
    this.setData({
      scrollTop: 0
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var self =this

    return {
      title: '【'+self.data.detail.nickname+'@我】你打赏他免单',
      path: 'pages/index/index?&share_query=1&id=' + this.data.id + '&type=2&share_member=' + wx.getStorageSync('member_id') + '&photo=' + this.data.detail.head_image,
      success: function (res) {
        self.setData({
          showModel: true,
        })
        // 转发成功
        wx.showModal({
          content: '转发成功',
          showCancel: false,
        })
      }
    }
 
  },
  cancelInfo:function(){
    wx.reLaunch({
      url: '../index/index',
    })
  }
})