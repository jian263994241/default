require('./style.less');
var tpl = require('./index.tpl.html');
var tplFn = Template7.compile(tpl);

module.exports = {
  init: function(page) {
    var qurey = $$.parseUrlQuery(location.href);
    var p = this;
    p.container = $$(page.container);

    p.bind(p.container);
  },
  bind: function($root) {
    var html = tplFn({name:'word'});
    $root.find('.page-content').html(html);
  }
}
