import style from './riskrating.css.lessm'
import {Component} from 'react'
import Qat from './questionTmpl'

class Q4 extends Component {
  static defaultProps = {
    q:'您是否有车险保单',
    a:['没有车险保单','保单金额1万以上','保单金额5千至1万元','保单金额3千至5千元', '保单金额1千至3千元', '保单金额1千元以下'],
    i: '4'
  }
  answerChange = (name, value)=>{
    const {router} = this.props;
    router.load({url:'grade/q/5'});
  }
  render(){
    return (
      <div className="page-content">
        <Qat question={this.props.q} questionIndex={this.props.i} answer={this.props.a} onChange={this.answerChange}/>
        <div className={style.next}>
            <a href={`grade/q/${this.props.i - 1}`} className="back" data-force="true">上一题</a>
            <div className={style.total}>{this.props.i}/5</div>
        </div>
      </div>
    );
  }
}


export default Q4;
