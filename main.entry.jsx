var util = require('./mod/common/util');
var createApp = require('./mod/createApp');

window.$$ = Dom7;
window.KQB = window.KQB || {};

var router = {
  'p/index.html': {
    mod:require('./mod/index'),
    title:'首页'
  },
  'p/other.html': {
    title:'other',
    mod:require('./mod/index/other')
  }
};

window.app = createApp(router);
window.mainView = app.addView('.view-main');

if (location.hash == '') {
  mainView.router.load({url: 'p/index.html', animatePages: false, reload: true});
}


KQB.native("setWebviewBounce", {enableBounce: false});
