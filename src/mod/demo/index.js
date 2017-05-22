import React, {Component} from 'react'

class Demo extends Component {
  static defaultProps = {
    q:'您是否有房贷',
    a:['没有房贷','月供2万以上','月供1万至2万','月供5千至1万', '月供2千至5千', '月供2千以下'],
    i: '1'
  }
  answerChange = (name, value)=>{
    console.log(name, value);
  }
  render(){
    return (
      <div className="page-content">
        <div className="content-block-title">
          首页
        </div>
        <div className="content-block">
          <a href="" className="button">问卷</a>
        </div>
      </div>
    );
  }
}


export default Demo;
