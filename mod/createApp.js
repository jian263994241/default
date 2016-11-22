var KQB = window.KQB;
var Framework7 = window.Framework7;

module.exports = function(reactComponent){
  var app = new Framework7({
    // pushState: false,
    reactComponent: reactComponent || {},
    preprocess:function(content){
      // KQB.native('navigationBarMenu', {menuList: []});
      return content;
    }
  });
  app.session = require('./common/storage').session;
  app.login = require('./common/H5login');
  return app;
};
