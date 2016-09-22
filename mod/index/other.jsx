var service = require("../common/service");
var util = require('../common/util');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      title:'我是其他页面'
    };
  },
  componentDidMount: function() {
    console.log(this.props);
  },
  render: function() {
    return (
      <div className="page-content">
        <div className="content-block-title">
          {this.state.title}
        </div>
        <div className="content-block">

        </div>
        <img src={__uri('../../res/images/logo-new.png')} alt=""/>
          <p>
            <a className="back" href="p/index.html">首页</a>
          </p>
      </div>
    );
  }

});
