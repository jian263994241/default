import {observable} from 'mobx';
import env from 'kqjs/lib/api';
import parseUrlQuery from 'kqjs/lib/utils/parseUrlQuery';

const ss = sessionStorage || {};
const query = parseUrlQuery(location.search);

class UIState {

  @observable isFefan = (env.FeiFan || query.from === 'feifan' );

  @observable navbar = Boolean(query.navbar == '1');

  @observable title = '';

  @observable step = -1;

}

const state = new UIState;

export default state;
