/**
 * @prams type: 'get','post'
 * @prams opt {
 * url (str):请求链接
 * data (obj): ajax 数据
 * codes (arr): 执行callback的先决条件 默认:["00"]
 * title (str): 等待标题 默认"请等待..."
 * callback (fn): 回调函数
 * loginToken (bool): 值为 true的时候  请求header 带入 loginToken
 *}
 **/
function method(type, opt) {

  var type = type.toLocaleUpperCase();
  var codes = opt.codes || ["00"];
  var title = opt.title || "请等待..."
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
  if (opt.loginToken) {
    ajaxOpt.headers = {
      Authorization: sessionStorage.loginToken
    }
  };

  function successHandle(data) {
    var codeIn = false;
    data = JSON.parse(data);
    console.log(opt.url, data);
    app.hidePreloader();
    codes.forEach(function(code, index) {
      if (data.errCode === code) {
        codeIn = true;
      }
    });
    if (codeIn) {
      return opt.callback(data);
    } else {
      return app.alert(data.errMsg);
    }
  };

  function errorHandle(xhr, status) {
    app.hidePreloader();
    return app.alert(opt.url, '请求异常 - ' + status);
  }
  app.showPreloader(title);
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
