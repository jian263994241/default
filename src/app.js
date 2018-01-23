import React, {Component} from 'react'
import {render} from 'react-dom'
import {Views, View, Pages, Preloader, classnames} from 'wonder'
import {observer, Provider} from 'mobx-react';
import UIState from './mod/store/UIState'

import IndexPage from './mod/index';
import OtherPage from './mod/demo';

const stores = {UIState};


@observer
class App extends Component {

  routes = [
    {path: '/', component: IndexPage},
    {path: '/other', component: OtherPage},
  ]

  render() {
    return (
      <Provider {...stores}>
        <Views className={classnames({ 'theme-blue': UIState.isFefan })} >
          <View type="hash">
            <Pages routes={this.routes} />
          </View>
          <Preloader visible={UIState.showPreloader}></Preloader>
        </Views>
      </Provider>
    );
  }
}

window.onPageInit = ({title})=>{
  document.title = title;
}

render(<App/>, document.querySelector('.root'));
