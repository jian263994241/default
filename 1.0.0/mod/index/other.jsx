var service = require("../common/service");

var Page = React.createClass({
  getInitialState: function() {
    return {};
  },
  getDefaultProps: function() {
    return {};
  },
  componentWillMount: function() {
    this.query = this.props.parent.query;
    this.view = this.props.parent.view;
    //this.update();
  },
  componentDidMount: function() {},
  componentWillReceiveProps: function() {},
  update: function() {},
  events: {},
  render: function() {
    return (
      <div className="page-content">
        <a href="#index">index</a>
        <img src={__uri('../../res/images/logo-new.png')} alt=""/>
      </div>
    )
  }
});

module.exports = function(app, page) {
  var container = page.container;
  ReactDOM.render(
    <Page parent={page}/>, container);
}
