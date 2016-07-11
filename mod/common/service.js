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
      return app.alert('[' + data.errCode + ']' + data.errMsg + opt.url);
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

var baseUrl = "https://ebd.99bill.com/coc-bill-api";

var api = {
  cardBin: "/1.1/banks/cardBin",
  banks: "/1.0/banks",
  userInfo: "/1.0/userInfo", //查询个人
  openAdr: "/1.0/members/card/openAdr" //获取开户地省市列表
};

for (key in api) {
  value = api[key];
  api[key] = baseUrl + value;
}


module.exports = {
  cardBin: function(cardNo, callback) {
    app.showPreloader();
    method('get', {
      url: api.cardBin,
      data: {
        cardBin: encryptByDES(cardNo)
      },
      callback: callback
    })
  },
  banks: function(callback) {
    app.showPreloader();
    method('get', {
      url: api.banks,
      data: {
        bankChannel: 1
      },
      callback: callback
    })
  },
  userInfo: function(callback) {
    var loginToken = app.session.get('loginToken');
    method('get', {
      url: api.userInfo,
      callback: callback
    }, loginToken);
  },
  openAdr: function(callback) {
    app.showPreloader();
    method('get', {
      url: api.openAdr,
      callback: callback
    })
  }
}
