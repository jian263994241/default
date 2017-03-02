import style from './riskrating.css.lessm'
import {Component} from 'react'
import Qat from './questionTmpl'

class q2 extends Component {
  static defaultProps = {
    q:'您是否有信用卡',
    a:['没有信用卡','额度5万以上','额度2万至5万','额度1万至2万', '额度5千至1万', '额度5千以下'],
    i: '2'
  }
  answerChange = (name, value)=>{
    const {router} = this.props;
    router.load({url:'grade/q/3'});
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


export default q2;
