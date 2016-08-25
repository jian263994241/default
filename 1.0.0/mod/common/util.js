module.exports = {
  // 验证登录密码 前提已满足只有特殊字符 字母和数字
  valiPassword: function(param) {
    var baseReg = /^[0-9a-zA-Z!@\$\~\&\=\#\[\]\`\|\{\}\?\%\^\*\/\'\.\_\-\+\(\)\,\:\;\~\%\<\>\"\\]{8,32}$/;
    if (!baseReg.test(param)) return false;
    var lowercase = /(?=.*[a-z])+/.test(param);
    var capital = /(?=.*[A-Z])+/.test(param);
    var number = /(?=.*[0-9])+/.test(param);
    var specialCharacter = /(?=.*[!@\$\~\&\=\#\[\]\`\|\{\}\?\%\^\*\/\'\.\_\-\+\(\)\,\:\;\~\%\<\>\"\\])+/.test(param);

    return (lowercase && capital) || (lowercase && number) || (lowercase && specialCharacter) || (capital && number) || (number && specialCharacter);
  },
  countDown: function(btn, s) {
    var btn = Dom7(btn);
    var s = s || 60;
    var SMStimer;
    btn.addClass('disabled');
    btn.html(String(s--) + 's重新发');
    SMStimer = setInterval(function(btn) {
      if (s == 0) {
        clearInterval(SMStimer);
        btn.removeClass('disabled');
        btn.html("重新发送短信");
        return;
      }
      btn.html(String(s--) + 's重新发');
    }, 1000, btn);
    return btn;
  },
  setTitle: function(title) {
    document.title = title;
    try {
      KQB.native("setPageTitle", {
        title: title
      });
    } catch (e) {}
  },
  env: function() {
    var ua = navigator.userAgent.toLowerCase();
    return {
      Weixin: ua.match(/MicroMessenger/i) == 'micromessenger',
      IOS: ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1,
      Android: ua.indexOf('android') > -1,
      KQ: ua.indexOf('kuaiqianbao') > -1,
      FeiFan: ua.indexOf('feifan') > -1
    };
  }(),
  getAppVersion: function() {
    var ua = window.navigator.userAgent.toLowerCase();
    ua.match(/kuaiqianbao\/([1-9.]+)/)
    return RegExp.$1;
  },
  findPosition: function(oElement) {
    var x2 = 0;
    var y2 = 0;
    var width = oElement.offsetWidth;
    var height = oElement.offsetHeight;

    if (typeof(oElement.offsetParent) != 'undefined') {
      for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
        posX += oElement.offsetLeft;
        posY += oElement.offsetTop;
      }
      x2 = posX + width;
      y2 = posY + height;
      return [posX, posY, x2, y2];

    } else {
      x2 = oElement.x + width;
      y2 = oElement.y + height;
      return [oElement.x, oElement.y, x2, y2];
    }
  },
  androidFix: function() {
    var _this = this;
    if (!_this.isAndroid()) return;

    var focTime, pos;

    focTime = null;

    pos = null;

    $$(document).on("focusin", "input", function(e) {
      var $content;
      clearTimeout(focTime);
      pos = _this.findPosition(e.target);
      $content = $$('.page-content');
      $content.css("padding-bottom", pos[3] + "px");
      return $content.scrollTop(pos[1] - $$(window).height() / 2 + 44, 0);
    });

    $$(document).on("focusout", "input", function(e) {
      return focTime = setTimeout((function() {
        var $content;
        $content = $$('.page-content');
        return $$('.page-content').css('padding-bottom', 0 + "px");
      }), 300);
    });
  },
  maxLength: function(value, maxLength) {
    return value.slice(0, maxLength);
  },
  inputMaxLength: function(input, maxLength) {
    $$(input).on('input', function(e) {
      e.target.value = maxLength(e.target.value, maxLength)
    });
  },
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
  ajax: function(type, opt) {
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
      error: errorHandle,
      beforeSend: beforeSend,
      complete: complete
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

    function beforeSend(xhr) {
      return app.showPreloader(title);
    };

    function complete(xhr, status) {
      return app.hidePreloader();
    };

    function successHandle(data, status, xhr) {
      var codeIn = false;
      try {
        var data = JSON.parse(data);
      } catch (e) {
        console.log(e);
      }
      console.groupCollapsed(xhr.requestParameters.method, xhr.requestUrl);
      console.log('headers:', xhr.requestParameters.headers);
      console.log('request:', typeof xhr.requestParameters.data == 'string' ? JSON.parse(xhr.requestParameters.data) : xhr.requestParameters.data);
      console.log('response:', data);
      console.groupEnd();
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
      if (opt.errorCallback) {
        return opt.errorCallback(xhr, status);
      };
      console.log('请求失败:', opt.url);
      return app.toast('网络状况不太好,稍后再试');
    };

    Dom7.ajax(ajaxOpt);
  },
  loadPage: function(url, success) {
    var app = Framework7.prototype.constructor();
    Dom7.ajax({
      method: 'GET',
      url: url,
      beforeSend: function() {
        app.showIndicator();
      },
      complete: function() {
        app.hideIndicator();
      },
      success: success,
      error: function() {
        app.toast('网络异常');
      }
    });
  },
  disableBounce: function() {
    document.body.addEventListener('touchmove', bodyScroll, false);
  },
  enableBounce: function() {
    document.body.removeEventListener('touchmove', bodyScroll, false);
  }

}

function bodyScroll(e) {
  e.preventDefault();
};
