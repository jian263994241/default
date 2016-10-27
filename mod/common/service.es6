
var baseUrl = "https://ebd.99bill.com/coc-bill-api";

if (location.port == "8080") {
  //本地调试走服务器代理
  baseUrl = "";
} else if (location.host === 'sandbox.99bill.com') {
  //sandbox
  baseUrl = "https://ebd-sandbox.99bill.com/coc-bill-api";
}

var api = {
  infomationComplete: '/loan-website/2.0/apply/infomationComplete', //完善资料信息查询
  cityDistrictData: "/loan-website/1.0/common/cityDistrictData", //获取县级市区数据
  provinceCityData: "/loan-website/1.0/common/provinceCityData", //获取省份和城市
  dictInfo: "/loan-website/1.0/common/99/dictInfo", //获取客户婚姻、学历、职务、联系人关系,行业 列表
  creditApplySave: '/loan-website/2.0/apply/creditApplySave', //申请保存接口
  creditAuthorizationAgreement: "/loan-website/1.0/apply/creditAuthorizationAgreement", //获取征信授权协议内容
  creditApplySubmit: '/loan-website/2.0/apply/creditApplySubmit' //申请提交接口
};

var key,value;

for (key in api) {
  value = api[key];
  api[key] = baseUrl + value;
}

var get = (api, data = {}) => {
  return new Promise((resolve, reject) => {
    $$.ajax({
      method: "GET",
      url: api,
      data: data,
      headers: {
        Authorization: sessionStorage.loginToken
      },
      dataType: 'json',
      success: (data, status, xhr) => resolve(data, status, xhr),
      error: (xhr, status) => reject(xhr, status)
    });
  });
};

var post = (api, data = {}) => {
  return new Promise((resolve, reject) => {
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
      error: (xhr, status) => reject(xhr, status)
    });
  });
};

var appType ,appVersion;

for (key in KQB.Env){
  if(KQB.Env[key] == true){
    appVersion = appType = key ;
  }
};

// service.dictInfo().then(function(data){console.log(data)})
var dictInfo = ()=> get(api.dictInfo) ;
var provinceCityData = ()=> post(api.provinceCityData, {appVersion, appType});
var cityDistrictData = (city) => post(api.cityDistrictData, {appVersion, appType, city});
var infomationComplete = ()=> get(api.infomationComplete);
var creditApplySave = (data)=> post(api.creditApplySave, data);

module.exports = { dictInfo, provinceCityData, cityDistrictData, infomationComplete, creditApplySave }
