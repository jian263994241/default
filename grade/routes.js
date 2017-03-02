import style from './mod/riskrating.css.lessm'

import q1 from './mod/q1'
import q2 from './mod/q2'
import q3 from './mod/q3'
import q4 from './mod/q4'
import q5 from './mod/q5'

const title = '财力测评'

const route = {
  'q/1': {
    title: title,
    mod : q1
  },
  'q/2': {
    title: title,
    mod : q2
  },
  'q/3': {
    title: title,
    mod : q3
  },
  'q/4': {
    title: title,
    mod : q4
  },
  'q/5': {
    title: title,
    mod : q5
  }
};

export default route;
