var tpl = require('./index.tpl.html');
var tplFn = Template7.compile(tpl);

var helper, service;

service = require("../common/service");
helper = require("../common/helper");

module.exports = function(app, page) {
  var container;
  container = $$(page.container);
}
