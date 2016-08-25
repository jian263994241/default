var method = require('./util').ajax;

var app = Framework7.prototype.constructor();

var baseUrl = "https://ebd.99bill.com";

if (location.port == "8080") {
  //本地调试走服务器代理
  baseUrl = "";
};

var ua = window.navigator.userAgent.toLowerCase();

var isKuaiQianBao = function() {
  return Boolean(ua.indexOf('kuaiqianbao') > -1);
};

var isWeixin = function() {
  return Boolean(ua.indexOf('micromessenger') > -1);
};

function appAuth(callback) {
  var url = baseUrl + '/coc-bill-api/1.0/app/auth';

  KQB.native("login", {
    success: function(res) {
      var accessToken = res.accessToken;
      KQB.native('getDeviceId', {
        success: function(res) {
          window.sessionStorage.setItem('deviceId', res.deviceId);
          method('post', {
            url: url,
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
  var url = baseUrl + "/coc-bill-api/1.0/billApi/auth";
  method('post', {
    url: url,
    data: {
      verifyCode: verifyCode
    },
    callback: callback
  });
};

function wxAuth(code, callback) {
  var url = baseUrl + "/coc-bill-api/1.0/oauth2/oauthInfo/";
  method('get', {
    url: url + code,
    callback: callback,
    codes: ['00', '01']
  });
};

module.exports = function(callback, errCallback) {
  var loginToken = window.sessionStorage.getItem("loginToken");
  var urlQuery = Dom7.parseUrlQuery(location.search);

  var next = function(data) {
    window.sessionStorage.setItem('loginToken', data.loginToken);
    callback(data.loginToken);
  };
  if (loginToken) {
    callback(loginToken);
  } else if (isKuaiQianBao()) {
    appAuth(next);
  } else if (isWeixin()) {
    wxAuth(urlQuery.code, function(data) {
      switch (data.errCode) {
        case '00':
          next()
          break;
        case '01':
          app.toast(data.errMsg);
          errCallback();
          break;
      }
    });
  } else if (urlQuery.verifyCode) {
    outAuth(urlQuery.verifyCode, next);
  } else {
    if (errCallback) {
      errCallback();
    } else {
      app.alert("未登录,请登录后再试");
    }
  }
};
