var method = Dom7.api;

var app = Framework7.prototype.constructor();

var baseUrl = "https://ebd.99bill.com";

var ss = window.sessionStorage;


if (location.port == '8080') {
  //本地调试走服务器代理
  baseUrl = '';
} else if (location.host === 'sandbox.99bill.com') {
  //sandbox
  baseUrl = 'https://ebd-sandbox.99bill.com';
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
      window.location.assign('/seashell/webapp/billtrunk2/sign.html?tab=in' + nextPage);
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
