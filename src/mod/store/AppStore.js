
import {mobx} from 'wonder'
import H5login from '../common/H5login'
import UIState from './UIState'
import * as service from '../common/service'


const {observable, action} = mobx;

const ss = window.sessionStorage || {};

class AppStore {

  @observable loginToken = ss.getItem('loginToken');

  @action login (){

    H5login(()=>{
      this.loginToken = ss.getItem('loginToken');
      UIState.showPreloader = false;
    })

  }

  // 业务逻辑写在这里 ....

}


export default new AppStore
