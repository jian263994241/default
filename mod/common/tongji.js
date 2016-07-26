
(function() {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?f8aa26d00df984f263a957ef3e78f3c4";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();

var trackEvent = function(_events,type){
  this._events = _events;
  this.type = type;
};

trackEvent.prototype.emit = function(name){
  try {
    _hmt.push(['_trackEvent',this.type, this._events[name]]);
  } catch (e) {

  }
};

var type = 'kuaiyihuasq_may01';

var _EVENTS = {
  "kuaiyihuasq_gerenxinxi":"kuaiyihuasq_may01_gerenxinxi", //个人信息
  "kuaiyihuasq_danweixinxi":"kuaiyihuasq_may01_danweixinxi", //单位信息
  "kuaiyihuasq_qitaxinxi":"kuaiyihuasq_may01_qitaxinxi", //其他信息
  "kuaiyihuasq_tijiao":"kuaiyihuasq_may01_gerenxinxi", //提交
  "kuaiyihuasq_chenggong":"kuaiyihuasq_may01_chenggong", //成功
  "kuaiyihuasq_tongxunlu":"kuaiyihuasq_may01_chenggong" //通讯录
}


module.exports = new trackEvent(_EVENTS,type);
