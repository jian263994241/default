var service = require("../common/service");


var Page = React.createClass({
  componentDidMount: function() {
    console.log(this.props);
  },
  render: function() {
    return (
      <div className="page" data-page="other" data-title="222">
        <div className="page-content">
          <div className="content-block-title">
            {this.props.query.title}
          </div>
          <div className="content-block">
            {this.props.query.des}
          </div>
          <img src={__uri('../../res/images/logo-new.png')} alt=""/>
        </div>
      </div>
    );
  }

});

module.exports = Page;
