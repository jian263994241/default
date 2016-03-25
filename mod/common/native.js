var ua = require('./ua');

module.exports = {
  openBusinessHome:function(businessCode){
    if (ua.isAndroid()){
		   android.openBusinessHome(businessCode);
		}else if(ua.isIOS()){
		   window.location.href = "bill99app://kuaiqianbao/openBusinessHome?businessCode="+businessCode;
		}else{
      app.alert('openBusinessHome','异常');
    }
  }
}
