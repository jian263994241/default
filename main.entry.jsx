
var createApp = require('./mod/createApp');

window.$$ = window.Dom7;

var router = {
  'p/index.html': {
    mod:require('./mod/index'),
    title:'首页'
  },
  'p/other.html': {
    title:'页面2',
    mod:require('./mod/index/other')
  },
  'p/other2.html': {
    title:'页面3',
    mod:require('./mod/index/yem3')
  }
};

var app = window.app = createApp(router);
app.mainView = app.addView('.view-main');

if (location.hash == '') {
  app.mainView.router.load({url: 'p/index.html', animatePages: false, reload: true});
}

// app.login(function(loginToken){
//   alert(loginToken)
// });

window.KQB.native('setWebviewBounce', {enableBounce: false});
