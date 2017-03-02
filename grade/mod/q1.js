import style from './riskrating.css.lessm'
import {Component} from 'react'
import Qat from './questionTmpl'

class Q1 extends Component {
  static defaultProps = {
    q:'您是否有房贷',
    a:['没有房贷','月供2万以上','月供1万至2万','月供5千至1万', '月供2千至5千', '月供2千以下'],
    i: '1'
  }
  answerChange = (name, value)=>{
    const {router} = this.props;
    router.load({url:'grade/q/2'});
  }
  render(){
    const {router} = this.props;

    return (
      <div className="page-content">
        <Qat question={this.props.q} questionIndex={this.props.i} answer={this.props.a} onChange={this.answerChange}/>
        <div className={style.next}>
            <div className={style.total}>{this.props.i}/5</div>
        </div>
      </div>
    );
  }
}


export default Q1;
