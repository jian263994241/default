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
  valiMoblie: function(param) {
    return /^[0-9]{11}$/.test(param);
  },
  valiValidateCode: function(param) {
    return /^[\s\S]{4}$/.test(param);
  },
  valiNumber: function(str, n) {
    var regex = new RegExp("^[0-9]{" + (n - 1) + "}[Xx0-9]{1}$");
    return regex.test(str);
  },
  valiNULL: function(str) {
    return str != '';
  }
}
