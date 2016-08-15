var service = require("../common/service");

var Page = React.createClass({
  getInitialState: function() {
    return {password: ""}
  },
  componentWillMount: function() {
    this.query = this.props.parent.query;
    this.view = this.props.parent.view;
    this.update();
  },
  // componentDidMount: function() {},
  componentWillReceiveProps: function() {
    // 如果需要刷新数据
    // this.update();
  },
  update: function() {
    console.log('other', 'ajax data ...');
  },
  events: {},
  render: function() {
    return (
      <div className="page-content">
        <a href="#index">index</a>
      </div>
    )
  }
});

module.exports = function(app, page) {
  var container = page.container;
  ReactDOM.render(
    <Page parent={page}/>, container);
}
