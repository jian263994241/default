var method = function(type, opt) {
  var app = Framework7.prototype.constructor();
  var type = type.toLocaleUpperCase();
  var codes = opt.codes || ["00"];
  var title = opt.title || "请等待..."
  var timeout = opt.timeout || 0;
  var showPreloader = opt.showPreloader == undefined ? true : opt.showPreloader;
  var ajaxOpt = {
    url: opt.url,
    method: type,
    timeout: timeout,
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
  //other token
  if (opt.token) {
    ajaxOpt.headers = {
      Authorization: sessionStorage.token
    }
  };

  function successHandle(data, status, xhr) {
    app.hidePreloader();
    var codeIn = false;
    try {
      var data = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }
    //登录失效判断
    if (data.errCode == '03' && opt.loginToken) {
      sessionStorage.removeItem('loginToken');
      return app.alert(data.errMsg);
    };

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
    if (opt.errorCallback) {
      return opt.errorCallback(xhr, status);
    };
    console.log('请求失败:', opt.url);
    return app.toast('网络状况不太好,稍后再试');
  };
  showPreloader && app.showPreloader(title);
  Dom7.ajax(ajaxOpt);
};

var app = Framework7.prototype.constructor();

var baseUrl = "https://ebd.99bill.com";

var ss = window.sessionStorage;

if (location.port == "8080") {
  //本地调试走服务器代理
  baseUrl = "";
} else if (location.host === 'sandbox.99bill.com') {
  //sandbox
  baseUrl = "https://ebd-sandbox.99bill.com";
}


var ua = window.navigator.userAgent.toLowerCase();

var isKuaiQianBao = function() {
  return Boolean(ua.indexOf('kuaiqianbao') > -1);
};

var isWeixin = function() {
  return Boolean(ua.indexOf('micromessenger') > -1);
};

function appAuth(callback) {
  var url = baseUrl + '/coc-bill-api/1.0/app/auth';
  kuaiqian.native("login", {
    success: function(res) {
      var accessToken = res.accessToken;
      KQB.native('getDeviceId', {
        success: function(res) {
          ss.setItem('deviceId', res.deviceId);
          method('post', {
            url: url,
            showPreloader: false,
            data: {
              accessToken: encodeURIComponent(decodeURIComponent(accessToken)),
              deviceId: res.deviceId
            },
            callback: callback
          });
        },
        error: function() {}
      });
    },
    error: function(res) {
      app.toast('登录失败');
    }
  });

};

function outAuth(verifyCode, callback) {
  var url = baseUrl + "/coc-bill-api/1.1/billApi/auth";
  method('post', {
    url: url,
    showPreloader: false,
    data: {
      verifyCode: verifyCode
    },
    callback: callback
  });
};

function wxAuth(code, callback) {
  var url = baseUrl + "/coc-bill-api/wx/1.1/oauth2/oauthInfo";
  method('get', {
    url: url,
    showPreloader: false,
    data: {
      code: code
    },
    callback: callback
  });
};

module.exports = function(callback, errCallback) {
  var loginToken = ss.getItem("loginToken");
  var urlQuery = Dom7.parseUrlQuery(location.search);

  var next = function(data) {
    ss.setItem('loginToken', data.loginToken);
    callback(data.loginToken);
  };

  var err = function() {
    if (errCallback) {
      errCallback();
    } else {
      // app.alert("未登录,请登录后再试");
      var nextPage = "&nextPage=" + encodeURIComponent(location.href);
      window.location.assign('https://www.99bill.com/seashell/webapp/billtrunk2/sign.html?tab=in' + nextPage);
    }
  };

  if (loginToken) {
    return callback(loginToken);
  };

  if (isKuaiQianBao()) {
    return appAuth(next);
  };

  if (isWeixin() && urlQuery.code) {
    return wxAuth(urlQuery.code, function(data) {
      ss.setItem('openId', data.openId);
      if (data.loginToken) {
        next(data);
      } else {
        err();
      }
    });
  };

  if (urlQuery.verifyCode) {
    return outAuth(urlQuery.verifyCode, next);
  }

  err();
};
