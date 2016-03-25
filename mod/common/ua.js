var ua = window.navigator.userAgent.toLowerCase();

module.exports = {
  isWeixin: function() {
    return Boolean(ua.match(/MicroMessenger/i) == 'micromessenger');
  },
  isAndroid: function() {
    return (ua.indexOf('android') > -1 || ua.indexOf('linux') > -1)
  },
  isIOS:function(){
    return (ua.indexOf('iphone') > -1 || ua.indexOf('mac') > -1);
  }
}
