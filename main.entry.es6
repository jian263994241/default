var createApp = require('./mod/app').createApp;
var util = require('./mod/common/util');


window.$$ = Dom7;

var mod = {
  index: require('./mod/index'),
  other: require('./mod/index/other')
}

var App = React.createClass({
  mixins: [createApp()],
  componentDidMount: function() {
    this.mainView = this.addView(this.refs.viewMain);
    $$(document).on('pageInit', function (e) {
      var page = e.detail.page;
      var pageMod = mod[page.name];
      if(pageMod){
        ReactDOM.render(React.createElement(pageMod, {query: page.query, view: page.view}), page.container);
      }
    });
    this.mainView.router.load({
      url:'p/index.html',
      animatePages: false,
      reload: true
    });
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
