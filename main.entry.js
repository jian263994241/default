var util = require('./mod/common/util');

var MOD = {
  index: require("./mod/index/index"),
  other: require("./mod/index/other")
};

window.$$ = Dom7;

//非React 框架用 onPageInit
//React 用onPageBeforeInit
$$(document)
  .on('pageInit', pageIn)
  .on('pageReinit', pageIn);

function pageIn(e) {
  var page = e.detail.page;
  if (MOD[page.name]) {
    return MOD[page.name](app, page);
  }
};

window.app = new Framework7({
  pushState: true,
  pushStateSeparator: '',
  swipeBackPage: false,
  // preprocess: function(content, url, next) {
  //   app.H5login.login(function() {
  //     next(content);
  //   });
  // },
  preroute: function(view, options) {
    setTimeout(function() {
      var page = view.activePage,
        dataset;
      if (!page) return;
      dataset = Dom7(page.container).dataset();
      util.setTitle(dataset.title);
      if (dataset.url) {
        util.loadPage(dataset.url, function(data) {
          Dom7(page.container).html(data);
        });
      }
    }, 300);
  }
});

window.mainView = app.addView('.view-main', {
  domCache: true
});


app.H5login = require('./mod/common/H5login')(app);
app.session = require('./mod/common/storage').session;

var targetPage = location.hash.replace(/^#/, '');

if (targetPage == "") {
  mainView.router.load({
    pageName: 'index',
    pushState: false,
    animatePages: false
  });
}
