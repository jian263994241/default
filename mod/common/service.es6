var baseUrl = "https://ebd.99bill.com/coc-bill-api";

if (location.port == "8080") {
  //本地调试走服务器代理
  baseUrl = "/coc-bill-api";
} else if (location.host === 'sandbox.99bill.com') {
  //sandbox
  baseUrl = "https://ebd-sandbox.99bill.com/coc-bill-api";
}

var ERROR_MSG = '网络状况不太好,请稍后再试';

function get (api, data = {}){
  return new Promise(function(resolve, reject){
    $$.ajax({
      method: "GET",
      url: api,
      data: data,
      headers: {
        Authorization: sessionStorage.loginToken
      },
      dataType: 'json',
      success: (data, status, xhr) => resolve(data, status, xhr),
      error: function (xhr, status) {
        // reject(xhr, status)
        window.app.toast(ERROR_MSG);
      }
    });
  });
}

function post (api, data = {}){
  return new Promise(function(resolve, reject) {
    $$.ajax({
      method: "POST",
      url: api,
      data: JSON.stringify(data),
      headers: {
        Authorization: sessionStorage.loginToken
      },
      contentType: 'application/json;charset=UTF-8',
      dataType: 'json',
      success: (data, status, xhr) => resolve(data, status, xhr),
      error: function (xhr, status) {
        // reject(xhr, status)
        window.app.toast(ERROR_MSG);
      }
    });
  });
};



var api = {
  coupons: '/1.0/crt/coupons', //T0040001L 券列表查询
};

var key,value;

for (key in api) {
  value = api[key];
  api[key] = baseUrl + value;
}

var appType ,appVersion;

for (key in KQB.Env){
  if(KQB.Env[key] == true){
    appVersion = appType = key ;
  }
};

// service.dictInfo().then(function(data){console.log(data)})

var coupons = (data)=> get(api.coupons, data) ;


module.exports = { coupons }
