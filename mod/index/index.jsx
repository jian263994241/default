var service = require("../common/service");
var util = require("../common/util");

module.exports = React.createClass({
  getInitialState: function() {
    return {displayName: "首页"}
  },
  componentDidMount:function(){
    var app = this.props.f7;
    var view = this.props.f7View;
    app.toast('demo0');
    //
    app.toast('demo1');

    app.alert('demo2');
    app.alert('demo3');
    app.alert('demo4');
  },
  events: {
    inputChange: function(e) {
      var input = e.target;
      this.setState({password: input.value});
    },
    forget: function() {
      app.alert('建设中...');
    },
    submit: function(e) {
      e.preventDefault();
      alert(123);
    }
  },
  render: function() {
    return (
      <div className="page" data-page="p/index.html">
        <div className="page-content">
          <div className="content-block-title text-center">
            {this.state.displayName}
          </div>
          <div className="content-block">
            <p>
              <a href="p/other.html">其他页</a>
            </p>
            <div className="content-block">
              其他页其他页其他页其他页其他页其他页其他页其他页其他页其他页其他页其他页其他页其他页其他页其他页其他页其他页
            </div>
          </div>
        </div>
      </div>
    )
  }
});
