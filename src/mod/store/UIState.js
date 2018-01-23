import {mobx, dom as $} from 'wonder';
import {observable} from 'mobx';
import env from 'kqjs/lib/api';

const ss = sessionStorage || {};
const query = $.parseQuery(location.search);

class UIState {

  @observable showPreloader = false;

  @observable isFefan = (env.FeiFan || query.from === 'feifan' );

  @observable navbar = Boolean(query.navbar == '1');

  @observable title = '';

  @observable step = -1;

}

const state = new UIState;

export default state;


window.onunhandledrejection = function(){
  state.showPreloader = false;
};
