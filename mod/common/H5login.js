var method = require('./ajaxWrap');

module.exports = function(app) {
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
    return Boolean(ua.match(/MicroMessenger/i) === 'micromessenger');
  };
  return {
    appAuth: function(callback) {
      var error, url;
      url = baseUrl + '/coc-bill-api/1.0/app/auth';
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
      var url = baseUrl + "/coc-bill-api/1.0/billApi/auth";
      method('post', {
        url: url,
        data: {
          verifyCode: verifyCode
        },
        callback: callback
      });
    },
    wxAuth: function(code, callback) {
      var url = baseUrl + "/1.0/oauth2/oauthInfo/";
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
