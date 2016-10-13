var util = require('./mod/common/util');
var createApp = require('./mod/createApp');

window.$$ = Dom7;
window.KQB = window.KQB || {};

var router = {
  'p/index.html': {
    title: '首页',
    mod: require('./mod/index')
  },
  'p/other.html': {
    title: '更多',
    mod: require('./mod/index/other')
  }
};

var App = React.createClass({
  mixins: [createApp(router)],
  componentDidMount: function() {
    this.mainView = this.addView(this.refs.viewMain);

    if (location.hash == '') {
      this.mainView.router.load({url: 'p/index.html', animatePages: false, reload: true});
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

ReactDOM.render(
  <App/>, document.body);

KQB.native("setWebviewBounce", {enableBounce: false});
