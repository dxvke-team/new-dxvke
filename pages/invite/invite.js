// pages/invite/invite.js
var http = require('../../utils/httpHelper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    newImage:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    const ctx = wx.createCanvasContext('imgCanvas')
    ctx.drawImage("../../images/user/invite_bd.jpg", 0, 0, 255, 402)
    that.setQrcode(ctx)
  },
  //第二步绘制二维码图片  
  setQrcode: function (context) {
    var that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    });  
    http.httpPost("getPersonEwm", {}, wx.getStorageSync('token'), function (res) {
      var qrcodeUrl = res.data.ewm
      wx.getImageInfo({
        src: qrcodeUrl,
        success: function (res) {
          context.drawImage(res.path, 130, 270, 65, 65);
          context.save();
          context.restore();
          context.stroke();
          that.setPhoto(context)
        }
      })
    });
    

  },  
  // 第三步绘制头像
  setPhoto: function (context) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              // 我是昵称，邀请你来享利客啦
              context.setFontSize(8);
              context.setTextAlign('left');
              context.setFillStyle('#333333');
              context.fillText('我是' + res.userInfo.nickName+',', 72,50)
              context.fillText('邀请你来享利客啦', 72, 60)
              context.save();
              context.restore();
              context.stroke();
              var src = res.userInfo.avatarUrl
              wx.getImageInfo({
                src: src,
                success:function(res){
                  var path = res.path
                  console.log(path)
                  context.arc(43, 44, 22, 0, 2 * Math.PI)
                  context.lineWidth = 2;  //描边宽度为3px
                  context.setStrokeStyle('#b760e6')
                  context.stroke();  //描边
                  context.clip()
                  context.drawImage(path, 21, 22, 44, 44);
                  context.save();
                  context.restore();
                  context.stroke();
                  context.draw(false, function (e) { 
                    wx.hideLoading()
                  })
                }
              })
              
            }
          })
        }
      }
    })
  }, 
  saveImg:function(){
    var that =this
    //绘制的最后一张图片绘制完之后回调生成图片 
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 30000
    });  
    wx.canvasToTempFilePath({
      canvasId: 'imgCanvas',
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        that.setData({
          newImage: tempFilePath,
        })
        wx.hideToast()
        //保存图片到相册  
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail(res) {
            wx.showToast({
              title: '保存失败',
              icon: 'success',
              duration: 2000
            })
          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },
  onShareAppMessage: function () {
    var that = this;
    var member_id = wx.getStorageSync('member_id');
    return {
      title: '洞悉微客',
      path: 'pages/index/index?is_share=1&share_member=' + wx.getStorageSync('member_id'),
      success: function (res) {
        // 转发成功
        wx.showModal({
          content: '转发成功',
          showCancel: false,
        })
      }
    }
  }
})