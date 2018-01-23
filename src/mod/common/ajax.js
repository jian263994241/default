import {Modal} from 'wonder';
import UIState from '../store/UIState';
import api from 'kqjs/lib/api';

let domain = "";

if (location.host === 'sandbox.99bill.com') {
  //sandbox
  domain = 'https://sandbox.99bill.com';
}

if (location.host === 'www.99bill.com') {
  domain = 'https://ebd.99bill.com';
}

const ajax = function({url, prefix = '/coc-bill-api', ...rest}){
  const api = api({
    url: domain + prefix + url,
    business: 'MEMBER-BASE',
    beforeSend(xhr){
      UIState.showPreloader = true;
    },
    complete(xhr, status){
      UIState.showPreloader = false;
    },
    ...rest
  });
  return api;
}

window.onAPIErrorHandler = function(data, status, xhr){
  UIState.showPreloader = false;
  //全局错误提示
  Modal.toast(data.errMsg || data.responseMsg);
}



export default ajax;
