/**
 * @prams type: 'get','post'
 * @prams opt {
 * url (str):请求链接
 * data (obj): ajax 数据
 * codes (arr): 执行callback的先决条件 默认:["00"]
 * title (str): 等待标题 默认"请等待..."
 * callback (fn): 回调函数
 * loginToken (bool): 值为 true的时候  请求header 带入 loginToken,其中 loginToken 从session中获取
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
      Authorization: app.session.get('loginToken')
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
  Dom7.ajax(ajaxOpt);
}

var baseUrl = "https://ebd.99bill.com/coc-bill-api";

if (location.port == "8080") {
  //本地调试走服务器代理
  baseUrl = "/coc-bill-api";
}

var api = {
  unRegistShareRelation: "/mkt/1.0/record/unRegist/shareRelation", //T0080004L 记录用户分享关系--用户未注册
};

for (key in api) {
  value = api[key];
  api[key] = baseUrl + value;
}


module.exports = {
  unRegistShareRelation: function(data, callback) {
    method('post', {
      url: api.unRegistShareRelation,
      title: "领取中...",
      data: {
        activityCode: data.activityCode,
        shareCode: data.shareCode
      },
      callback: callback,
      loginToken: true,
      codes: ['00', '20', '21']
    });
  }
}
