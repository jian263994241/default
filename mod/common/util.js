

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
  setTitle: function(){
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
      isWeixin: ua.match(/MicroMessenger/i) == 'micromessenger',
      iOS: ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1,
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
  }

}
