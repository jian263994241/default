//计时等待状态
var modalWait = {
  open: function() {
    var $time, timeI = 1;
    var _this = this;
    this.waiting = app.modal({
      text: '<div class="preloader"></div>',
      afterText: '<p>正在验证<br>大约需要<b>1</b>秒，请耐心等待</p>',
      theme: 'black'
    });
    $time = $$(this.waiting).find('b');
    this.timer = setInterval(function() {
      $time.html(++timeI);
    }, 1000);
    return this;
  },
  close: function() {
    app.closeModal(this.waiting);
    clearInterval(this.timer);
  }
};
//倒计时button
var btnCountdown = function(btn, s) {
  btn.addClass('disabled');
  var s = s || 60;
  btn.html(s-- + 's后重新发送');
  SMStimer = setInterval(function() {
    if (s == 0) {
      clearInterval(SMStimer);
      btn.removeClass('disabled');
      btn.html(btn.data('text'));
      return;
    }
    btn.html(s-- + 's后重新发送');
  }, 1000);
  return btn;
};
exports.modalWait = modalWait;
exports.btnCountdown = btnCountdown;
