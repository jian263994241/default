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
  // getDefaultProps
  // componentWillMount
  // componentDidMount: function() {},
  // componentWillReceiveProps
  componentWillReceiveProps: function() {
    // 如果需要刷新数据
    // this.update();
  },
  update: function() {
    console.log('index', 'ajax data ...');
  },
  events: {
    inputChange: function(e) {
      var input = e.target;
      this.refs.submit.disabled = input.value.length > 5
        ? 0
        : 1;
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
          请输入登录密码进行验证
        </div>
        <form className="list-block" onSubmit={this.events.submit.bind(this)}>
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-title label">登录密码</div>
                  <div className="item-input">
                    <input type="password" placeholder="输入登录密码" onChange={this.events.inputChange.bind(this)} value={this.state.password}/>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div className="list-block-label">
            <a onClick={this.events.forget} className="color">忘记密码?</a>
            <p>
              <button className="button button-fill button-big button-block" disabled ref="submit">下一步</button>
            </p>
          </div>
        </form>
        <a href="#other">link other page</a>
      </div>
    )
  }
});

module.exports = function(app, page) {
  var container = page.container;

  ReactDOM.render(
    <Page parent={page}/>, container);
}
