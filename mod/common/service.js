
var baseUrl = "https://ebd.99bill.com/coc-bill-api";

api = {
  banks: "/1.0/banks"
};

for (key in api) {
  value = api[key];
  api[key] = baseUrl + value;
}

function method(type, opt, loginToken) {

  var type = type.toLocaleUpperCase();
  var ajaxOpt = {
    url: opt.url,
    method: type,
    success: successHandle,
    error: errorHandle
  };
  if (opt.data) {
    if (type === "POST") {
      ajaxOpt.contentType = 'application/json;charset=UTF-8';
      ajaxOpt.data = JSON.stringify(opt.data);
    } else {
      ajaxOpt.data = opt.data;
    }
  }
  if (loginToken) {
    ajaxOpt.headers = {
      Authorization: loginToken
    }
  }

  function successHandle(data) {
    data = JSON.parse(data);
    console.log(opt.url, data);
    app.hidePreloader();
    if (data.errCode === '00') {
      return opt.callback(data);
    } else {
      return app.toast('[' + data.errCode + ']' + data.errMsg);
    }
  };

  function errorHandle(xhr, status) {
    app.hidePreloader();
    if (status === 'timeout') {
      return opt.timeoutCall();
    } else {
      return app.toast('网络异常: ' + '[' + status + ']' + opt.url);
    }
  }

  return Dom7.ajax(ajaxOpt);
}

module.exports = {
  
  banks: function(callback) {
    app.showPreloader();
    method('get', {
      url: api.banks,
      data: {
        bankChannel: 1
      },
      callback: callback
    })
  }
  
}
