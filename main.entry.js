window.$$ = Dom7;
window.app = new Framework7({
  // pushState: true,
  template7Pages: true
});

window.viewMain = app.addView('.view-main');

var mod = {};

mod.index = require('./mod/index/index');


$$(document).on('pageInit', function(e){
  var page = e.detail.page;
  document.title = $$(page.container).data('title');
  mod[page.name] && mod[page.name].init(page);
});

viewMain.router.load({
  url: 'page/index.html',
  animatePages: false,
  pushState:false
});
