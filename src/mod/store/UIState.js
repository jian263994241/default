
import {mobx} from 'wonder'

const {observable} = mobx;

class UIState {

  @observable showPreloader = false;

}


export default new UIState;
