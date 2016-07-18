module.exports = function(app) {
  var ua = window.navigator.userAgent.toLowerCase();
  var isKuaiQianBao = function() {
    return Boolean(ua.indexOf('kuaiqianbao') > -1);
  };
  var isWeixin = function() {
    return Boolean(ua.match(/MicroMessenger/i) === 'micromessenger');
  };
  return {
    appAuth: function(callback) {
      var error, url;
      url = 'https://ebd.99bill.com/coc-bill-api/1.0/app/auth';
      error = function(res) {
        return alert(JSON.stringify(res));
      };
      return kuaiqian.getAccessToken({
        success: function(res) {
          var accessToken;
          accessToken = res.accessToken;
          return kuaiqian.getDeviceId({
            success: function(res) {
              var deviceId;
              deviceId = res.deviceId;
              app.showPreloader();
              method('post', {
                url: url,
                data: {
                  accessToken: encodeURIComponent(decodeURIComponent(accessToken)),
                  deviceId: deviceId
                },
                callback: callback
              });
            },
            error: error
          });
        },
        error: error
      });
    },
    outAuth: function(verifyCode, callback) {
      var url = "https://ebd.99bill.com/coc-bill-api/1.0/billApi/auth";
      app.showPreloader();
      method('post', {
        url: url,
        data: {
          verifyCode: verifyCode
        },
        callback: callback
      });
    },
    wxAuth: function(code, callback) {
      var url = "https://ebd.99bill.com/1.0/oauth2/oauthInfo/";
      app.showPreloader();
      method('get', {
        url: url + code,
        callback: callback
      });
    },
    login: function(callback) {
      var loginToken = window.sessionStorage.getItem("loginToken");
      var urlQuery = Dom7.parseUrlQuery(location.search);
      var next = function(data) {
        window.sessionStorage.setItem('loginToken', data.loginToken);
        callback(data.loginToken);
      };
      if (loginToken) {
        callback(loginToken);
      } else if (isKuaiQianBao()) {
        this.appAuth(next);
      } else if (isWeixin()) {
        this.wxAuth(next);
      } else if (urlQuery.verifyCode) {
        this.outAuth(urlQuery.verifyCode, next);
      } else {
        app.alert("未登录,请登录后再试");
      }
    }
  };
};

function method(type, opt, loginToken) {
  type = type.toLocaleUpperCase();
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
      return app.alert(data.errMsg);
    }
  };

  function errorHandle(xhr, status) {
    app.hidePreloader();
    return app.alert('[' + status + ']请求异常' + opt.url);
  }

  return Dom7.ajax(ajaxOpt);
}
