import {dom as $} from 'wonder'

export default function nextpage(replace = false){
  console.log('nextPage');
  const preQuery = $.parseQuery(window.location.search);

  const redirectURL = preQuery.nextPage;

  if(!redirectURL) return ;

  if(replace){
    window.location.replace(redirectURL);
  }else{
    window.location.assign(redirectURL);
  }
}
