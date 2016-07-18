var util = require('./mod/common/util');
var MOD = {
  index: require("./mod/index/index")
};

window.$$ = Dom7;

window.app = new Framework7({
  // pushState: true,
  swipeBackPage: false,
  //非React 框架用 onPageInit
  //React 用onPageBeforeInit
  onPageBeforeInit: function(app, page) {
    if (MOD[page.name]) {
      return MOD[page.name](app, page);
    }
  },
  onPageBeforeAnimation: function(app, page) {
    var dataset = Dom7(page.container).dataset();
    util.setTitle(dataset.title);
  },
  preprocess: function(content, url, next) {
    app.H5login.login(function() {
      next(content);
    });
  }
});

app.H5login = require('./mod/common/H5login')(app);
app.session = require('./mod/common/storage').session;

window.mainView = app.addView('.view-main', {
  domCache: true
});

mainView.router.load({
  pageName: 'index',
  pushState: false,
  animatePages: false
});

//测试用
// var query = $$.parseUrlQuery(location.search);
// if (query.loginToken) {
//   app.session.set("loginToken", query.loginToken);
// }
