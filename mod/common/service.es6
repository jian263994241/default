var encryptByDES = window.encryptByDES;
var baseUrl = 'https://ebd.99bill.com/coc-bill-api';
var debug = false;

if (location.port == '8080') {
  //本地调试走服务器代理
  baseUrl = '/coc-bill-api';
  debug = true;
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

var method = function(type, opt){
  opt.debug = debug;
  $.api(type, opt);
};

// var ERROR_MSG = '网络状况不太好,请稍后再试';

// function get (api, data = {}){
//   return new Promise(function(resolve, reject){
//     $$.ajax({
//       method: "GET",
//       url: api,
//       data: data,
//       headers: {
//         Authorization: sessionStorage.loginToken
//       },
//       dataType: 'json',
//       success: (data, status, xhr) => resolve(data, status, xhr),
//       error: function (xhr, status) {
//         // reject(xhr, status)
//         window.app.toast(ERROR_MSG);
//       }
//     });
//   });
// }
//
// function post (api, data = {}){
//   return new Promise(function(resolve, reject) {
//     $$.ajax({
//       method: "POST",
//       url: api,
//       data: JSON.stringify(data),
//       headers: {
//         Authorization: sessionStorage.loginToken
//       },
//       contentType: 'application/json;charset=UTF-8',
//       dataType: 'json',
//       success: (data, status, xhr) => resolve(data, status, xhr),
//       error: function (xhr, status) {
//         // reject(xhr, status)
//         window.app.toast(ERROR_MSG);
//       }
//     });
//   });
// };

// service.dictInfo().then(function(data){console.log(data)})

// var coupons = (data)=> get(api.coupons, data);

// module.exports = { coupons }

module.exports = {
  quotaPreJudge: function(data, callback) {
    method('post', {
      url: api.quotaPreJudge,
      loginToken: true,
      callback: callback,
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
