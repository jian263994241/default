module.exports = {
  read: function(name) {
    var cookieStr = "; " + document.cookie + "; ";
    var index = cookieStr.indexOf("; " + name + "=");
    if (index != -1) {
      var s = cookieStr.substring(index + name.length + 3, cookieStr.length);
      return unescape(s.substring(0, s.indexOf(";")));
    } else {
      return null;
    }
  },
  set: function(name, value, expires) {
    var expHours = expires * 60 * 60 * 1000;
    var expDate = new Date();
    expDate.setTime(expDate.getTime() + expHours);
    var expString = expires ? "; expires =" + expDate.toGMTString() : "";
    var pathString = ";path=/";
    document.cookie = name + "=" + escape(value) + expString + pathString;
  },
  del: function(name) {
    var exp = new Date(new Date().getTime() - 1);
    var s = this.read(name);
    if (s != null) {
      document.cookie = name + "=" + s + ";expires=" + exp.toGMTString() + ";path=/"
    };
  }
}
