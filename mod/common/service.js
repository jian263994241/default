var Mock, api, baseUrl, get, key, post, value;

  baseUrl = "https://ebd.99bill.com/coc-bill-api";

  api = {
    validateCode: "/1.0/sms/validateCode",
    banks: "/1.0/banks",
    payAuth: "/1.0/members/password/payAuth",
    cardBin: "/1.0/banks/",
    cardAuths: "/1.1/members/cardAuths",
    userInfo: "/1.0/userInfo",
    addCard: "/1.1/members/cards",
    openAdr: "/1.0/members/card/openAdr"
  };

  for (key in api) {
    value = api[key];
    api[key] = baseUrl + value;
  }

 get = function(url, data, headers, cb, postJSON, timeoutCall) {
  var ajaxOpt;
  if (postJSON == null) {
    postJSON = false;
  }
  if (timeoutCall == null) {
    timeoutCall = function() {alert('请求超时')};
  }
  ajaxOpt = {
    url: url,
    method: "GET",
    timeout: 1000 * 60,
    success: function(data) {
      data = JSON.parse(data);
      app.hideIndicator();
      console.log(url, data);
      if (data.errCode === "00") {
        return cb(data);
      } else {
        return app.alert("[" + data.errCode + "]" + data.errMsg);
      }
    },
    error: function(xhr, status) {
      app.hideIndicator();
      if (status === "timeout") {
        return timeoutCall();
      } else {
        return app.alert("请求异常: " + "[" + status + "]" + url );
      }
    }
  };
  if (postJSON) {
    ajaxOpt.contentType = "application/json;charset=UTF-8";
    if (data != null) {
      ajaxOpt.data = JSON.stringify(data);
    }
  } else {
    if (data != null) {
      ajaxOpt.data = data;
    }
  }
  if (headers != null) {
    ajaxOpt.headers = headers;
  }
  app.showIndicator();
  return $$.ajax(ajaxOpt);
};

post = function(url, data, headers, cb, timeoutCall) {
  var ajaxOpt;
  if (timeoutCall == null) {
    timeoutCall = function() {alert('请求超时')};
  }
  ajaxOpt = {
    url: url,
    method: "POST",
    contentType: "application/json;charset=UTF-8",
    timeout: 1000 * 60,
    success: function(data) {
      data = JSON.parse(data);
      app.hideIndicator();
      console.log(url, data);
      if (data.errCode === "00") {
        return cb(data);
      } else {
        return app.alert("[" + data.errCode + "]" + data.errMsg);
      }
    },
    error: function(xhr, status) {
      app.hideIndicator();
      if (status === "timeout") {
        return timeoutCall();
      } else {
        return app.alert("请求异常: " + url + "[" + status + "]");
      }
    }
  };
  if (data != null) {
    ajaxOpt.data = JSON.stringify(data);
  }
  if (headers != null) {
    ajaxOpt.headers = headers;
  }
  app.showIndicator();
  return $$.ajax(ajaxOpt);
};
module.exports = {
 cardBin: function(cardNo, callback) {
    return get(api.cardBin + encryptByDES(cardNo), null, null, callback);
 },
 userInfo: function(loginToken, callback) {
      return get(api.userInfo, null, {
        Authorization: loginToken
      }, callback);
 }
  
}
