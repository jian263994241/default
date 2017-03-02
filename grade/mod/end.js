import style from './riskrating.css.lessm'
import {Component} from 'react'


class End extends Component {

  render(){
    return (
      <div className="page-content">
        <div className={style.intro}>
          <i className={`icon ${style.icon} ${style['icon-r4']}`}></i>
          <div className={style.text}>您的风险等级：成长型</div>
          <div className={style.desc}>可以承担略高风险，获取高回报投资收益。</div>
        </div>
        <div className="content-block">
          <a href="" className="button button-fill button-big">完成</a>
        </div>
      </div>
    );
  }
}


export default End;
