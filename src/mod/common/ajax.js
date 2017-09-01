import {kq} from 'wonder'

let domain = "";

if (location.host === 'sandbox.99bill.com') {
  //sandbox
  domain = 'https://sandbox.99bill.com';
}

if (location.host === 'www.99bill.com') {
  domain = 'https://ebd.99bill.com';
}

const ajax = function({url, prefix = '/coc-bill-api', ...rest}){
  const api = kq.api({
    url: domain + prefix + url,
    business: 'MEMBER-BASE',
    ...rest
  });
  return api;
}



export default ajax;
