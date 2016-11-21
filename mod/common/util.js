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
    btn = Dom7(btn);
    s = s || 60;
    var SMStimer;
    btn.addClass('disabled');
    btn.html(String(s--) + 's重新发');
    SMStimer = setInterval(function(btn) {
      if (s == 0) {
        clearInterval(SMStimer);
        btn.removeClass('disabled');
        btn.html('重新发送短信');
        return;
      }
      btn.html(String(s--) + 's重新发');
    }, 1000, btn);
    return btn;
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
    ua.match(/kuaiqianbao\/([1-9.]+)/);
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
  androidFix: function($content) {
    var _this = this;
    if (!_this.isAndroid()) return;

    var focTime, pos;

    focTime = null;

    pos = null;

    $$(document).on('focusin', 'input', function(e) {
      clearTimeout(focTime);
      pos = _this.findPosition(e.target);
      $content.css('padding-bottom', pos[3] + 'px');
      return $content.scrollTop(pos[1] - $$(window).height() / 2 + 44, 0);
    });

    $$(document).on('focusout', 'input', function() {
      focTime = setTimeout((function() {
        return $content.css('padding-bottom', 0 + 'px');
      }), 300);
    });
  },
  maxLength: function(value, maxLength) {
    return value.slice(0, maxLength);
  },
  inputMaxLength: function(input, maxLength) {
    $$(input).on('input', function(e) {
      e.target.value = maxLength(e.target.value, maxLength);
    });
  },
  /**
   * @prams type: 'get','post'
   * @prams opt:obj {
   *  url:str 请求链接
   *  data:obj (选填) ajax 数据
   *  codes:arr (选填) 执行callback的先决条件 默认:['00']
   *  title:str (选填) 等待标题 默认'请等待...'
   *  callback:fn 回调函数
   *  loginToken:bool, (选填) 值为 true 的时候  请求header 带入 loginToken
   *  timeout:num (选填) 超时时间 , 默认 0
   *}
   **/
  ajax: function(type, opt) {

    var codes = opt.codes == undefined ? ['00'] : opt.codes;
    var app = Framework7.prototype.constructor();
    var title = opt.title || '请等待...';
    var timeout = opt.timeout || 0;
    var showPreloader = opt.showPreloader || true;
    var data = opt.data || {};

    type = type.toLocaleUpperCase();

    var ajaxOpt = {
      url: opt.url,
      method: type,
      dataType: 'json',
      timeout: timeout,
      data: data,
      headers:{
        Authorization: sessionStorage.loginToken
      },
      success: successHandle,
      error: errorHandle
    };

    if (type === 'POST') {
      ajaxOpt.contentType = 'application/json;charset=UTF-8';
      ajaxOpt.data = JSON.stringify(data);
    }

    function successHandle(data, status, xhr) {
      var codeIn = false;
      console.log('');
      console.log(xhr.requestParameters.method, xhr.requestUrl);
      console.log('loginToken', sessionStorage.loginToken);
      console.log('req:', typeof xhr.requestParameters.data == 'string' ? JSON.parse(xhr.requestParameters.data) : xhr.requestParameters.data);
      console.log('res:', data);
      console.log('');

      if(codes === 'all'){
        return opt.callback(data);
      }

      codes.forEach(function(code) {
        if (data.errCode === code) {
          codeIn = true;
        }
      });

      app.hidePreloader();

      if (codeIn) {
        return opt.callback(data);
      }else if(data.errCode === '03'){
        //登录失效判断
        sessionStorage.removeItem('loginToken');
      }

      return app.toast(data.errMsg);
    }

    function errorHandle() {
      app.hidePreloader();
      return app.toast('网络状况不太好,请稍后再试');
    }

    showPreloader && app.showPreloader(title);
    Dom7.ajax(ajaxOpt);
  }

};
