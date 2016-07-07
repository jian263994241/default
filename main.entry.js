var MOD;

MOD = {
  welcome: require("./mod/welcome"),
  index: require("./mod/index/index")
};

window.$$ = Dom7;

window.app = new Framework7({
  pushState: false,
  template7Pages: true,
  init: false,
  onPageInit: function(app, page) {
    if (MOD[page.name]) {
      return MOD[page.name](app, page);
    }
  }
});

app.session = require('./mod/common/storage').session;

window.mainView = app.addView('.view-main');

app.init();
