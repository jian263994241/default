var util = require('./mod/common/util');

var MOD = {
  index: require("./mod/index/index"),
  other: require("./mod/index/other")
};

window.$$ = Dom7;

$$(document)
  .on('pageBeforeInit', pageIn)
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
  onPageBeforeInit: function() {
    //重置IOS回弹,方便page单独disableBounce
    util.enableBounce();
  },
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


app.login = require('./mod/common/H5login');
app.session = require('./mod/common/storage').session;

var targetPage = location.hash.replace(/^#/, '');

if (targetPage == "") {
  targetPage = "index";
}
mainView.router.load({
  pageName: targetPage,
  pushState: false,
  animatePages: false
});
