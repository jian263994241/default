var method = require('./util').ajax;

var baseUrl = "https://ebd.99bill.com/coc-bill-api";

if (location.port == "8080") {
  //本地调试走服务器代理
  baseUrl = "/coc-bill-api";
} else if (location.host === 'sandbox.99bill.com') {
  //sandbox
  baseUrl = "https://ebd-sandbox.99bill.com";
}

var api = {
  unRegistShareRelation: "/mkt/1.0/record/unRegist/shareRelation", //T0080004L 记录用户分享关系--用户未注册
};

for (key in api) {
  value = api[key];
  api[key] = baseUrl + value;
}


module.exports = {
  unRegistShareRelation: function(data, callback) {
    method('post', {
      url: api.unRegistShareRelation,
      title: "领取中...",
      data: {
        activityCode: data.activityCode,
        shareCode: data.shareCode
      },
      callback: callback,
      loginToken: true,
      codes: ['00', '20', '21']
    });
  }
}
