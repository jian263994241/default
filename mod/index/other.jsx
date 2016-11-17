var React = window.React;

module.exports = React.createClass({
  render: function() {
    return (
      <div className="page-content hide-bars-on-scroll">
        <div className="content-block-title">
          页面标题
        </div>
        <div className="content-block">
          <p>
            <a className="back" href="">返回</a>
          </p>
        </div>
        <img src={__uri('/res/images/logo-new.png')} alt=""/>
        <p>
          <a href="p/other2.html">下一页</a>
        </p>
      </div>
    );
  }

});
