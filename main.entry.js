var customModalTpl = require('./mod/common/color.modal.html');

window.$$ = Dom7;
window.app = new Framework7({
  // pushState: true,
  template7Pages: true,
  modalTemplate:customModalTpl
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
  url: 'pages/index.html',
  animatePages: false,
  pushState:false
});
