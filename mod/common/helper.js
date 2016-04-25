module.exports = {
  //倒计时button
  stateToggle: function(btn, s) {
  btn.addClass('disabled');
  var s = s || 60;
  btn.html(s-- + 's后重发');
  SMStimer = setInterval(function() {
    if (s == 0) {
      clearInterval(SMStimer);
      btn.removeClass('disabled');
      btn.html(btn.data('text'));
      return;
    }
    btn.html(s-- + 's后重发');
  }, 1000);
  return btn;
  }
}


