
if(window.ReactDOM){
  //替换目标节点
  window.ReactDOM.renderReplace = function(reactElement , domContainerNode){
    var tempdom = document.createElement('div');
    var $r = this.render(reactElement, tempdom);
    domContainerNode.appendChild(tempdom.querySelector('.page'));
    return $r;
  }
}

module.exports = function(){
  var app = new Framework7({
    pushState: true,
    virtualPageRoot: "p/", //多个的时候 ["p/","m/"]
    preprocess:function(content, url, next){
      //reset page
      KQB.native('navigationBarMenu', {menuList: []});
      return content;
    }
  });
  app.session = require('./common/storage').session;
  app.login = require('./common/H5login');
  return app;
}
