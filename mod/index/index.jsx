var service = require("../common/service");
var util = require("../common/util");
console.log(service);
module.exports = React.createClass({

  render: function() {
    return (
      <div className="page-content">
        <div className="content-block-title text-center">
          这是首页
        </div>
        <div className="content-block">
          <p>
            <a href="p/other.html">下一页</a>
          </p>
        </div>
      </div>
    )
  }
});
