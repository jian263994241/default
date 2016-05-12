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
  stateToggle: function(btn) {
    btn.addClass('disabled');
    var s = 60;
    btn.html(s-- + 's重新发');
    SMStimer = setInterval(function() {
      if (s == 0) {
        clearInterval(SMStimer);
        btn.removeClass('disabled');
        btn.html(btn.data('text'));
        return;
      }
      btn.html(s-- + 's重新发');
    }, 1000);
    return btn;
  },
  findPosition: function(oElement){
    var x2 = 0;
    var y2 = 0;
    var width = oElement.offsetWidth;
    var height = oElement.offsetHeight;

    if( typeof( oElement.offsetParent ) != 'undefined' )
    {
      for( var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent )
      {
        posX += oElement.offsetLeft;
        posY += oElement.offsetTop;
      }
      x2 = posX + width;
      y2 = posY + height;
      return [ posX, posY ,x2, y2];

      } else{
        x2 = oElement.x + width;
        y2 = oElement.y + height;
        return [ oElement.x, oElement.y, x2, y2];
    }
  }
}
