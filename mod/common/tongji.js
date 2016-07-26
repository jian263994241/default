(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?f8aa26d00df984f263a957ef3e78f3c4";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

var trackEvent = function(events, type) {
  this._events = events;
  this.type = type;
};

trackEvent.prototype.emit = function(key) {
  try {
    _hmt.push(['_trackEvent', this.type, this._events[key - 1]]);
  } catch (e) {

  }
};

var type = 'yaoqinghaoyou_jul01';

// ① 邀请好友_邀请1
// ② 邀请好友_活动详情
// ③ 邀请好友_邀请2
// ④ 邀请好友_实名认证
// ⑤ 邀请好友_活动详情页面
// ⑥ 邀请好友_我的邀请页面
// ⑦ 邀请好友_实名认证页面
var EVENTS = [
  "yaoqinghaoyou_jul01_yaoqing1", "yaoqinghaoyou_jul01_huodongxiangqing", "yaoqinghaoyou_jul01_yaoqing2", "yaoqinghaoyou_jul01_shimingrenzheng", "yaoqinghaoyou_jul01_huodongxiangqingym", "yaoqinghaoyou_jul01_wodeyaoqingym", "yaoqinghaoyou_jul01_shimingym"
]


module.exports = new trackEvent(EVENTS, type);
