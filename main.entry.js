var MOD;

MOD = {
  index: require("./mod/index/index")
};

window.$$ = Dom7;

window.app = new Framework7({
  // pushState: true,
  swipeBackPage: false,
  onPageBeforeInit: function(app, page) {
    if (MOD[page.name]) {
      return MOD[page.name](app, page);
    }
  },
  onPageBeforeAnimation: function(app, page) {
    var dataset = Dom7(page.container).dataset();
    app.title(dataset.title);
  }
});

app.title = function(title) {
  document.title = title;
  try {
    kuaiqian.setPageTitle({
      title: title
    });
  } catch (e) {
    // alert(e)
  }
};
app.env = function() {
  var ua = navigator.userAgent.toLowerCase();
  return {
    isWeixin: ua.match(/MicroMessenger/i) == 'micromessenger',
    iOS: ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1,
    Android: ua.indexOf('android') > -1,
    KQ: ua.indexOf('kuaiqianbao') > -1,
    FeiFan: ua.indexOf('feifan') > -1
  };
}();

app.session = require('./mod/common/storage').session;

window.mainView = app.addView('.view-main', {
  domCache: true
});

mainView.router.load({
  pageName: 'index',
  pushState: false
});

//测试用
// var query = $$.parseUrlQuery(location.search);
// if (query.loginToken) {
//   app.session.set("loginToken", query.loginToken);
// }
