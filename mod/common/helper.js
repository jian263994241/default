module.exports = {
  btnCountdown: function(btn,s) {
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
  }
}
