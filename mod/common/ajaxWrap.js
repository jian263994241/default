/**
 * @prams type: 'get','post'
 * @prams opt:obj {
 *  url:str 请求链接
 *  data:obj (选填) ajax 数据
 *  codes:arr (选填) 执行callback的先决条件 默认:["00"]
 *  title:str (选填) 等待标题 默认"请等待..."
 *  callback:fn 回调函数
 *  loginToken:bool, (选填) 值为 true 的时候  请求header 带入 loginToken
 *  timeout:num (选填) 超时时间 , 默认 0
 *  errorCallback:fn (选填) 错误回调函数
 *}
 **/

module.exports = function(type, opt) {
  var app = Framework7.prototype.constructor();
  var type = type.toLocaleUpperCase();
  var codes = opt.codes || ["00"];
  var title = opt.title || "请等待..."
  var timeout = opt.timeout || 0;
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
    var codeIn = false;
    var data = JSON.parse(data);

    app.hidePreloader();

    console.groupCollapsed(xhr.requestParameters.method, xhr.requestUrl);
    console.log('headers:', xhr.requestParameters.headers);
    console.log('request:', xhr.requestParameters.data);
    console.log('response:', data);
    console.groupEnd();

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
    return app.alert(opt.url, '请求异常 - ' + status);
  };

  app.showPreloader(title);
  Dom7.ajax(ajaxOpt);
};
