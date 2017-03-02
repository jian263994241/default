import style from './riskrating.css.lessm'
import {PureComponent} from 'react'


class Question extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      message: ''
    };
    this.inputChangeHandler = (name, value) => this.props.onChange(name, value);
  }

  static aIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

  render(){

    const {question, questionIndex, answer} = this.props;

    function aMap(item, index){
      const name = `q${questionIndex}`;
      const value = Question.aIndex[index];
      return (
        <li>
            <label className="label-radio item-content" onClick={this.inputChangeHandler.bind(this, name, value)}>
                <input type="radio" name={'radio-'+name} value={value}/>
                <div className="item-inner">
                    <div className="item-title">{value}. {item}</div>
                </div>
            </label>
        </li>
      );
    }

    return (
      <div>
        <div className={style.qtit}>{questionIndex}. {question}</div>
        <div className="list-block">
          <ul>{answer.map(aMap.bind(this))}</ul>
        </div>
      </div>
    );

  }

}

export default Question;
