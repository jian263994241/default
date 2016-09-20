
var util = require('./common/util');

var $ = window.Dom7;

module.exports = {
  createApp: function(){
    //创建F7对象
    var app = new Framework7({
      pushState: true,
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
    app.session = require('./common/storage').session;
    app.login = require('./common/H5login');
    return app;
  }
}
