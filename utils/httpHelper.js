var config = require('../config.js') 
function Get (url, data, token='', cb ){
  data.version = '2.5';
	wx.showNavigationBarLoading();
	wx.request({
    method:'GET',
		url: config.HTTP_BASE_URL + url,
		data: data,
    header: {
      'content-type': 'application/json', // 默认值
      'token' : token
    },
		success: (res) => {
      if(res.data.code == '601'){
        wx.navigateTo({
          url: '../login/login',
        })
      }
			typeof cb == "function" && cb(res.data,"");
			wx.hideNavigationBarLoading();
		},
		fail:(err) => {
			typeof cb == "function" && cb(null,err.errMsg);
			wx.hideNavigationBarLoading();
		}
	});
};

function Post (url,data, token='', cb ){
  data.version = '2.5';
  var session_id = wx.getStorageSync('PHPSESSID');//本地取存储的sessionID  
	wx.request({
    method:'POST',
		url:  config.HTTP_BASE_URL + url,
		data: data,
    header: {
      'content-type': 'application/json', // 默认值
      'token': token
    },
		success: (res) => {
      if (res.data.code == '601') {
        wx.navigateTo({
          url: '../login/login',
        })
      }
			typeof cb == "function" && cb(res.data,"");
		},
		fail:(err) => {
			typeof cb == "function" && cb(null,err.errMsg);
		}
	});
};

function Upload (url ,file ,data, cb ){
	wx.uploadFile({
		url:  config.HTTP_BASE_URL + url,
		filePath: file,
		name:"file",
		formData:data,
		success: (res) => {
			if( typeof(res.data)=="string"  ){
				typeof cb == "function" && cb( JSON.parse(res.data),"");
			}else{
				typeof cb == "function" && cb(res.data,"");	
			}
			
		},
		fail:(err) => {
			typeof cb == "function" && cb(null,err.errMsg);
		}
	});
};


module.exports ={
    httpGet:Get,
    httpPost:Post,
	httpUpload:Upload
};