var util = require('./mod/common/util');

var MOD = {
  index: require("./mod/index/index"),
  other: require("./mod/index/other")
};

window.$$ = Dom7;

window.app = new Framework7({
  pushState: true,
  pushStateSeparator: '',
  swipeBackPage: false,
  pushStateNoAnimation: true,
  onPageInit:function pageIn(app, page) {
    if (mod[page.name]) {
      return mod[page.name](page);
    }
  },
  preroute: function(view, options) {
    setTimeout(function() {
      var page = view.activePage,
        dataset;
      if (!page) return;
      dataset = $$(page.container).dataset();
      util.setTitle(dataset.title);
      if (dataset.disablebounce) {
        util.disableBounce();
      } else {
        util.enableBounce();
      }
      KQB.native('navigationBarMenu', {
        menuList: []
      });
    }, 100);
  }
});

window.mainView = app.addView('.view-main', {
  domCache: true
});


app.login = require('./mod/common/H5login');
app.session = require('./mod/common/storage').session;

app.loadContent = function(opt){
  var page = document.createElement('div');
  var pClass = opt.class || "page" ;
  var pushState = opt.pushState || true;
  var animatePages = opt.animatePages || true;
  page.setAttribute('data-page',opt.name);
  page.setAttribute('class', pClass);
  page.setAttribute('data-title', opt.title);
  ReactDOM.render(React.createElement(opt.rdom, {query: opt.query}), page);
  mainView.router.load({
    content:page,
    pushState:pushState,
    animatePages:animatePages
  });
};

var targetPage = location.hash.replace(/^#/, '');
if (targetPage == "") {
  targetPage = "index";
};

mainView.router.load({
  pageName: targetPage,
  pushState: false,
  animatePages: false
});
