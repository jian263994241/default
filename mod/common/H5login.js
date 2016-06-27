module.exports = function(app) {
  var get, isKuaiQianBao, isWeixin, post, ua;
  ua = window.navigator.userAgent.toLowerCase();
  isKuaiQianBao = function() {
    return Boolean(ua.indexOf('kuaiqianbao') > -1);
  };
  isWeixin = function() {
    return Boolean(ua.match(/MicroMessenger/i) === 'micromessenger');
  };
  post = function(url, data, headers, cb) {
    var ajaxOpt;
    ajaxOpt = {
      url: url,
      method: "POST",
      contentType: "application/json;charset=UTF-8",
      success: function(data) {
        data = JSON.parse(data);
        app.hidePreloader();
        console.log(url, data);
        if (data.errCode === "00") {
          return cb(data);
        } else {
          return app.alert("[" + data.errCode + "]" + data.errMsg);
        }
      },
      error: function(xhr, status) {
        app.hidePreloader();
        return app.alert("请求异常:[" + status + "]:" + url);
      }
    };
    if (data != null) {
      ajaxOpt.data = JSON.stringify(data);
    }
    if (headers != null) {
      ajaxOpt.headers = headers;
    }
    app.showPreloader();
    return $$.ajax(ajaxOpt);
  };
  get = function(url, data, headers, cb) {
    var ajaxOpt;
    ajaxOpt = {
      url: url,
      method: "GET",
      success: function(data) {
        data = JSON.parse(data);
        app.hidePreloader();
        console.log(url, data);
        if (data.errCode === "00") {
          return cb(data);
        } else {
          return app.alert("[" + data.errCode + "]" + data.errMsg);
        }
      },
      error: function(xhr, status) {
        app.hidePreloader();
        return app.alert("请求异常:[" + status + "]:" + url);
      }
    };
    if (data != null) {
      ajaxOpt.data = data;
    }
    if (headers != null) {
      ajaxOpt.headers = headers;
    }
    app.showPreloader();
    return $$.ajax(ajaxOpt);
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
              return post(url, {
                accessToken: encodeURIComponent(accessToken),
                deviceId: deviceId
              }, null, callback);
            },
            error: error
          });
        },
        error: error
      });
    },
    outAuth: function(verifyCode, callback) {
      var url;
      url = "https://ebd.99bill.com/coc-bill-api/1.0/billApi/auth";
      return post(url, {
        verifyCode: verifyCode
      }, null, callback);
    },
    wxAuth: function(code, callback) {
      var url;
      url = "https://ebd.99bill.com/1.0/oauth2/oauthInfo/";
      return get(url + code, null, null, callback);
    },
    login: function(callback) {
      var loginToken, next, urlQuery;
      loginToken = sessionStorage.getItem("loginToken");
      urlQuery = Dom7.parseUrlQuery(location.search);
      next = function(data) {
        sessionStorage.setItem(data.loginToken);
        return callback(data.loginToken);
      };
      if (loginToken) {
        return callback(loginToken);
      } else if (isKuaiQianBao()) {
        return this.appAuth(next);
      } else if (isWeixin()) {
        return this.wxAuth(next);
      } else if (urlQuery.verifyCode) {
        return this.outAuth(urlQuery.verifyCode, next);
      } else {
        return app.alert("\u73af\u5883\u4e0d\u652f\u6301\u002c\u8bf7\u624b\u52a8\u83b7\u53d6loginToken");
      }
    }
  };
};
