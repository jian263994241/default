var service = require("../common/service");
var util = require("../common/util");

var Index =  React.createClass({
  getInitialState: function() {
    return {password: ""}
  },
  componentWillMount: function() {
    // console.log(this);
  },
  componentWillReceiveProps: function() {

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
    },
    link:function(){
      app.load({
        pageName:'other',
        pushState: true,
        props:{
          query:{
            title:'这个是标题',
            des:'描述..............'
          }
        }
      })
    }
  },
  render: function() {
    return (
      <div className="page" data-page="index" data-title="首页">
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
          <a onClick={this.events.link}>link other page</a>
        </div>
      </div>
    )
  }
});

module.exports = Index;
