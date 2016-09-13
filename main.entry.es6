var createApp = require('./mod/createApp');
var util = require('./mod/common/util');

window.$ = Dom7;

var App = React.createClass({
  mixins: [createApp()],
  pages:{
    'index': require('./mod/index'),
    'other': require('./mod/index/other')
  },
  load:function(opt){
    var defaultOpt = {
      pageName:'index',
      props: {},
      pushState: false,
      animatePages: true
    };
    for (var key in defaultOpt){
      if(opt[key] == undefined) opt[key] = defaultOpt[key];
    };
    var load = this.mainView.router.load;
    var page = this.pages[opt.pageName];
    page && load({
      content: util.createContent(page, opt.props),
      pushState: opt.pushState,
      animatePages: opt.animatePages
    });
  },
  removeReactDom: function(elem){
    setTimeout(function(){
      var mountNode = ReactDOM.findDOMNode(elem);
      ReactDOM.unmountComponentAtNode(mountNode);
    }, 0);
  },
  componentDidMount: function() {
    this.mainView = this.addView(this.refs.viewMain);
    this.load({
      pageName:'index',
      animatePages: false
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
