import style from './riskrating.css.lessm'
import {Component} from 'react'
import Qat from './questionTmpl'

class Q5 extends Component {
  static defaultProps = {
    q:'您的最高学历',
    a:['博士','研究生','本科','大科', '高中(含高职)', '初中', '小学'],
    i: '5'
  }
  answerChange = (name, value)=>{
    const {router} = this.props;
    router.load({url:'grade/end'});
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


export default Q5;
