import {kq} from 'wonder'

const encryptByDES = window.encryptByDES;

let domain = "";

if (location.host === 'sandbox.99bill.com') {
  //sandbox
  domain = 'https://sandbox.99bill.com';
}

if (location.host === 'www.99bill.com') {
  //sandbox
  domain = 'https://ebd.99bill.com';
}

const ajax = function({url, ...other}){
  const api = kq.api({
    url: domain + url,
    business: 'MEMBER-BASE',
    ...other
  });
  return api;
}

const API = {
  login: '/coc-bill-api/mam/3.0/members/password/login', //登录
}


export function login (data) {
  const idContent = encryptByDES(data.idContent);
  const password = encryptByDES(data.password);
  return ajax({
    method: 'post',
    url: API.login,
    data:{idContent, password}
  });
}
