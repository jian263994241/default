var service = require("../common/service");


module.exports = React.createClass({

  render: function() {
    return (
      <div className="page" data-page="other" data-title="222">
        <div className="page-content">
          <div className="content-block-title">

          </div>
          <div className="content-block">

          </div>
          <img src={__uri('../../res/images/logo-new.png')} alt=""/>
            <p>
              <a className="back" href="p/index.html">首页</a>
            </p>
        </div>
      </div>
    );
  }

});
