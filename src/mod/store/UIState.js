import {mobx, kq, dom as $} from 'wonder';
import {observable} from 'mobx';

const ss = sessionStorage || {};
const query = $.parseQuery(location.search);

class UIState {

  @observable showPreloader = false;

  @observable isFefan = (kqlib.Env.FeiFan || query.from === 'feifan' );

  @observable navbar = Boolean(query.navbar == '1');

  @observable title = '';

  @observable step = -1;

}

const state = new UIState;

export default state;


window.onunhandledrejection = function(){
  state.showPreloader = false;
};
