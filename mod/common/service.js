
// var baseUrl = "https://ebd.99bill.com/coc-bill-api";

if(location.origin.indexOf('sandbox.99bill') == -1 ){
    ebdoOrigin = "ebd.99bill.com";
}else{
    ebdoOrigin = "101.227.69.165"
}
var baseUrl = "https://" + ebdoOrigin + "/coc-bill-api";

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
var ajax, util;

util = require('util');

ajax = function(options) {
  var ajaxOpt, opt;
  opt = util._extend({
    url: '',
    method: 'GET',
    data: null,
    headers: null,
    timeout: 1000 * 60,
    contentJSON: false,
    showPreloader: true,
    callback: function() {},
    timeoutCall: function() {
      alert('网络超时');
    }
  }, options);
  ajaxOpt = {
    url: opt.url,
    method: opt.method,
    timeout: opt.timeout,
    success: function(data) {
      data = JSON.parse(data);
      opt.showPreloader && app.hidePreloader();
      console.log(opt.url, data);
      if (data.errCode === '00') {
        return opt.callback(data);
      } else {
        return app.alert('[' + data.errCode + ']' + data.errMsg);
      }
    },
    error: function(xhr, status) {
      opt.showPreloader && app.hidePreloader();
      if (status === 'timeout') {
        return opt.timeoutCall();
      } else {
        return app.alert('请求异常: ' + '[' + status + ']' + opt.url);
      }
    }
  };
  if (opt.data) {
    if (opt.contentJSON) {
      ajaxOpt.contentType = 'application/json;charset=UTF-8';
      ajaxOpt.data = JSON.stringify(opt.data);
    } else {
      ajaxOpt.data = opt.data;
    }
  }
  if (opt.headers) {
    ajaxOpt.headers = opt.headers;
  }
  opt.showPreloader && app.showPreloader();
  return Dom7.ajax(ajaxOpt);
};

module.exports = {
  
 
  
}
