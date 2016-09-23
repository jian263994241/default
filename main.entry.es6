var util = require('./mod/common/util');
var createApp = require('./mod/createApp');

window.$$ = Dom7;

var router =  {
  'p/index.html': {title: '首页', mod: require('./mod/index')},
  'p/other.html': {title: '更多', mod: require('./mod/index/other')},
};

$$(document).on('pageBeforeInit', function (e) {
  var f7page = e.detail.page;
  var page = router[f7page.url];

  if(page && page.title){
    util.setTitle(page.title);
  }

  if(page && page.mod){
    page.$r = ReactDOM.renderReplace(React.createElement(page.mod, {f7page: f7page, router: router}), f7page.container);
  }
});

$$(document).on('pageBack', function (e) {
  var url = e.detail.page.view.url;
  var page = router[url];
  if(page){
    util.setTitle(page.title);
  }
});

var App = React.createClass({
  mixins: [createApp()],
  componentDidMount: function() {
    this.mainView = this.addView(this.refs.viewMain);

    if(location.hash == ''){
      this.mainView.router.load({
        url:'p/index.html',
        animatePages: false,
        reload: true
      });
    }
  },
  render: function() {
    return (
      <div className="views">
        <div className="view view-main" ref="viewMain">
          <div className="pages"></div>
        </div>
      </div>
    );
  }
});

window.app = ReactDOM.render(<App />, document.body);
