
import {mobx, kq, dom as $} from 'wonder';

const {observable} = mobx;
const ss = sessionStorage || {};
const query = $.parseQuery(location.search);

class UIState {

  @observable showPreloader = false;

  @observable isFefan = (kq.Env.FeiFan || query.from === 'feifan' );

  @observable navbar = Boolean(query.navbar == '1');

  @observable title = '';

}


export default new UIState;
