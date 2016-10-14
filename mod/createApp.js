module.exports = function(reactComponent){
  var app = new Framework7({
    pushState: true,
    reactComponent: reactComponent || {}, //和 virtualPageRoot参数一起调用
    preprocess:function(content, url, next){
      //reset page
      KQB.native && KQB.native('navigationBarMenu', {menuList: []});
      return content;
    }
  });
  app.session = require('./common/storage').session;
  app.login = require('./common/H5login');
  return app;
}
