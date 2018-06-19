import React, {Component} from 'react'
import {render} from 'react-dom'
import {View, Pages} from 'wonder-ui/Core';
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
        <View onPageInit={this.onPageInit} >
          <Pages routes={this.routes} />
        </View>
      </Provider>
    );
  }
}


render(<App/>, document.querySelector('.root'));
