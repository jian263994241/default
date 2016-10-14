var service = require("../common/service");
var util = require('../common/util');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      displayName:'我是其他页面'
    };
  },
  componentDidMount: function() {
    this.pageData = this.props.pageData;

  },
  post2IndexData:function(){

    app.mainView.router.back({
      url:'p/index.html',
      force: true,
      query: {
        a:1
      }
    });
    
  },
  render: function() {
    return (
      <div className="page navbar-fixed">
        <div className="navbar">
          <div className="navbar-inner">
            <div className="left">
              <a className="link icon-only back" href="p/index.html">
                <i className={`icon icon-back`}></i>
              </a>
            </div>
            <div className="center">
              支付方式
            </div>
          </div>
        </div>
        <div className="page-content hide-bars-on-scroll">
          <div className="content-block-title">
            {this.state.displayName}
          </div>
          <div className="content-block">

          </div>
          <img src={__uri('../../res/images/logo-new.png')} alt=""/>
          <p>
            <a onClick={this.post2IndexData.bind(this)}>post2IndexData</a>
          </p>
          <p>
            <a className="back" href="p/index.html" data-force="true">首页</a>
          </p>
          <div style={{height:500}}></div>
        </div>
      </div>
    );
  }

});
