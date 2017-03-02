import style from './riskrating.css.lessm'
import {Component} from 'react'
import Qat from './questionTmpl'

class q3 extends Component {
  static defaultProps = {
    q:'您是否有缴纳公积金',
    a:['没有缴纳公积金','每月缴纳2500元以上','每月缴纳2000元至2500元','每月缴纳1000元至2000元', '每月缴纳500元至1000元', '每月缴纳500元以下'],
    i: '3'
  }
  answerChange = (name, value)=>{
    const {router} = this.props;
    router.load({url:'grade/q/4'});
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


export default q3;
