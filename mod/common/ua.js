var ua = window.navigator.userAgent.toLowerCase();

module.exports = {
  isWeixin: function() {
    return Boolean(ua.match(/MicroMessenger/i) == 'micromessenger');
  },
  isAndroid: function() {
    return (ua.indexOf('Android') > -1 || u.indexOf('Linux') > -1)
  },
  isIOS:function(){
    return (ua.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1);
  }
}
