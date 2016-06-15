var util = require('util');
var baseUrl = "https://ebd.99bill.com/coc-bill-api";

api = {
  validateCode: "/1.0/sms/validateCode"
};

for (key in api) {
  value = api[key];
  api[key] = baseUrl + value;
}

 /*
 * opt {url, method, timeout ,data, headers, contentJSON ,callback, timeoutCall}
 */
var ajax = function(options) {
  // 默认值
  var opt = util._extend({
    url: '',
    method: 'GET',
    data: null,
    headers: null,
    timeout: 1000 * 60,
    contentJSON: false,
    callback: function() {},
    timeoutCall: function() {
      alert('网络超时');
    }
  }, options);
  var ajaxOpt = {
    url: opt.url,
    method: opt.method,
    timeout: opt.timeout,
    success: function(data) {
      data = JSON.parse(data);
      app.hideIndicator();
      console.log(opt.url, data);
      if (data.errCode === "00") {
        return opt.callback(data);
      } else {
        return app.alert("[" + data.errCode + "]" + data.errMsg);
      }
    },
    error: function(xhr, status) {
      app.hideIndicator();
      if (status === "timeout") {
        return opt.timeoutCall();
      } else {
        return app.alert("请求异常: " + "[" + status + "]" + opt.url);
      }
    }
  };
  if (opt.data) {
    if (opt.contentJSON) {
      ajaxOpt.contentType = "application/json;charset=UTF-8";
      ajaxOpt.data = JSON.stringify(opt.data);
    } else {
      ajaxOpt.data = opt.data;
    }
  }
  if (opt.headers) {
    ajaxOpt.headers = opt.headers;
  }
  app.showIndicator();
  return Dom7.ajax(ajaxOpt);
};

module.exports = {
  
 //钱包内获取loginToken
 appAuth: function(callback){
    var accessToken, deviceId, url,error;
    url = "https://ebd.99bill.com/coc-bill-api/1.0/app/auth"
    error = function(res){
      alert(JSON.stringify(res));
    };
    kuaiqian.getAccessToken({
      success:function(res){
        accessToken = res.accessToken;
        kuaiqian.getDeviceId({
          success:function(res){
            deviceId = res.deviceId;
            ajax({
              url: url,
              method: 'POST',
              contentJSON: true,
              data: {
                accessToken: encodeURIComponent(accessToken),
                deviceId: deviceId
              },
              callback: callback
            });
          },
          error: error
        })
      },
      error: error
    });
  }
  
}
