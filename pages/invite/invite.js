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
    ctx.save()
    ctx.restore();
    ctx.stroke();
    that.setQrcode(ctx)
  },
  //第二步绘制二维码图片  
  setQrcode: function (context) {
    var that = this;
    http.httpPost("getPersonEwm", {}, wx.getStorageSync('token'), function (res) {
      var qrcodeUrl = res.data.ewm
      wx.downloadFile({
        url: res.data.ewm, 
        success: function (res) {
          if (res.statusCode == 200) {
            // tempFilePath
            context.drawImage(res.tempFilePath, 95, 250, 65, 65);
            context.save();
            context.restore();
            context.stroke();
            // context.draw(false, function (e) {

            // })
            that.setPhoto(context)
          }
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
              context.setFillStyle('#ffffff');
              context.fillText('我是' + res.userInfo.nickName+',', 45,18)
              context.fillText('邀请你来享利客啦', 45, 28)
              context.save();
              context.restore();
              context.stroke();
              var src = res.userInfo.avatarUrl
              wx.downloadFile({
                url: src,
                success: function (res) {
                  if (res.statusCode == 200) {
                    var path = res.tempFilePath
                    context.arc(20, 20, 14, 0, 2 * Math.PI)
                    context.setStrokeStyle('#ffffff')
                    context.stroke();  //描边
                    context.clip()
                    context.drawImage(path, 0,0, 40, 40,);
                    context.save();
                    context.restore();
                    context.stroke();
                    context.draw(false, function (e) {

                    })
                  } 
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
        wx.getSetting({
          success:(res) => {
            if (res.authSetting['scope.writePhotosAlbum'] === false){ //未授权
              wx.openSetting({
                success: (openRes) => {

                }
              });
            }else{
              //保存图片到相册  
              wx.saveImageToPhotosAlbum({
                filePath: tempFilePath,
                success(res) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              })
            }
          }
        })
      },
      fail: function (res) {
      }
    });
  },
  onShareAppMessage: function () {
    var that = this;
    var member_id = wx.getStorageSync('member_id');
    return {
      title: '推荐好友,锁定粉丝',
      path: 'pages/index/index?is_share=1&share_member=' + wx.getStorageSync('member_id'),
      imageUrl: '../../images/inviteShare.jpg',
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