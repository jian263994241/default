var encryptByDES = window.encryptByDES;
var baseUrl = 'https://ebd.99bill.com/coc-bill-api';


if (location.port == '8080') {
  //本地调试走服务器代理
  baseUrl = '/coc-bill-api';

} else if (location.host === 'sandbox.99bill.com') {
  //sandbox
  baseUrl = 'https://ebd-sandbox.99bill.com/coc-bill-api';
}

var api = {
  coupons: '/1.0/crt/coupons', //T0040001L 券列表查询
};

for (var key in api) {
  var value = api[key];
  api[key] = baseUrl + value;
}

var method = Dom7.api;

// business
//
// 业务场景
//
// AM-KLL	快利来
// VAS-GOLD-INTEREST	黄金权益
// MKT-CRT-PKG 卡券包

module.exports = {
  quotaPreJudge: function(data, callback) {
    method('post', {
      url: api.quotaPreJudge,
      loginToken: true,
      callback: callback,
      // business: 'AM-KLL',
      data: {
        merchantCode: data.merchantCode,
        channelType: data.channelType,
        outTradeNo: data.outTradeNo,
        payAmount: data.payAmount,
        payMode: data.payMode,
        sysVersion: 'v1.0.1'
      },
      codes: ['00', '34']
    });
  }
};
