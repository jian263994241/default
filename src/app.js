import React, {Component} from 'react'
import {render} from 'react-dom'
import {Views, View, Pages, Preloader, classnames} from 'wonder'
import {observer, Provider} from 'mobx-react';
import UIState from './mod/store/UIState'

import IndexPage from './mod/pages/index';
import OtherPage from './mod/pages/demo';

const stores = {UIState};

@observer
class App extends Component {

  routes = [
    {path: '/', component: IndexPage},
    {path: '/other', component: OtherPage},
  ]

  onPageInit = ({title})=>{
    document.title = title;
  }

  render() {
    return (
      <Provider {...stores}>
        <Views
          className={classnames({ 'theme-blue': UIState.isFefan })}
          onPageInit={this.onPageInit}
        >
          <View type="hash">
            <Pages routes={this.routes} />
          </View>
          <Preloader visible={UIState.showPreloader}></Preloader>
        </Views>
      </Provider>
    );
  }
}


render(<App/>, document.querySelector('.root'));
