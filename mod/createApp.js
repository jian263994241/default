
var util = require('./common/util');

var $ = window.Dom7;

module.exports = function(){
  //创建F7对象
  return new Framework7({
    pushState: true,
    // pushStateSeparator: '',
    swipeBackPage: false,
    dynamicPageUrl:'{{name}}',
    // pushStateNoAnimation: true,
    preroute: function(view, options) {
      setTimeout(function() {
        var page = view.activePage,
          dataset;
        if (!page) return;
        dataset = $(page.container).dataset();
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
}
