import ajax from './ajax';
import device from 'kqjs/lib/env';

// 运行环境
const __env = window.__ENV__ ? window.__ENV__.name : 'prod';

// 域名
let domain = {
  ffan: 'https://api.ffan.com',
  fcc: 'https://fcc-fql-api.ffan.com',
  ebd: 'https://ebd.99bill.com',
  jr: 'https://jr.99bill.com',
  rip: 'https://rip.99bill.com'
}

// 本地服务做了代理
if (location.port === '8080') {
    domain.ebd = '';
    domain.jr = '';
    domain.rip = '';
}

// fcc 测试环境域名
if (__env !== 'prod') {
    domain.fcc = 'https://fcc-fql-api.uat.ffan.com';
}

// 服务API
const API_URL = {
  // 查询资讯列表页接口 http://192.168.127.151:8080/workspace/myWorkspace.do?projectId=48#2459
  queryNewsList: domain.jr + '/fpd-platform/common/news/queryNewsList.htm',
};

/**
 * 查询资讯列表页接口
 */
const queryNewsList = (type=3, pageSize=3)=>{
  let orderSource = 2;

  if(device.KQ){
      orderSource = 3;
  }else if(device.FeiFan){
      orderSource = 6;
  }else if(device.Weixin){
      orderSource = 8;
  }

  return ajax({
      method: 'post',
      url: API_URL.queryNewsList,
      data: {
          type,
          pageSize
      },
      token: false,
      errCode: ['0000']
  });
}

export default {
  queryNewsList
}
