var service = require("../common/service");
var util = require("../common/util");

module.exports = React.createClass({
  getInitialState: function() {
    return {title: "首页"}
  },
  componentDidMount:function(){
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
      <div className="page-content">
        <div className="content-block-title text-center">
          {this.state.title}
        </div>
        <div className="content-block">
          <p>
            <a href="p/other.html">其他页</a>
          </p>

        </div>
      </div>
    )
  }
});
