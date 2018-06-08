import {Modal} from 'wonder';
import {showPreloader, hidePreloader} from 'wonder-ui/Preloader';
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
      showPreloader();
    },
    complete(xhr, status){
      hidePreloader();
    },
    ...rest
  });
  return api;
}

window.onAPIErrorHandler = function(data, status, xhr){
  hidePreloader();
  //全局错误提示
  Modal.toast(data.errMsg || data.responseMsg);
}



export default ajax;
