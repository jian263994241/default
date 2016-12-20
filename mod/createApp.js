
function createApp(reactComponent){
  var app = new Framework7({
    reactComponent: reactComponent || {}
  });
  app.session = require('./common/storage').session;
  app.login = require('./common/H5login');
  return app;
}


module.exports = createApp ;
