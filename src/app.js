import React, {Component} from 'react'
import {render} from 'react-dom'
import {Views, View, Pages, Preloader, classnames} from 'wonder'
import {observer, Provider} from 'mobx-react';
import find from 'lodash/find';
import UIState from './mod/store/UIState'

import IndexPage from './mod/index';
import OtherPage from './mod/demo';

const stores = {UIState};


@observer
class App extends Component {

  routes = [
    {path: '/', component: IndexPage, title: '首页'},
    {path: '/other', component: OtherPage, title: '更多页面'},
  ]

  getCurrent = ({pathname}) =>{
    return find(this.routes, {path: pathname})
  }

  routeInit = (location, action)=>{
    let current = this.getCurrent(location);
    if(current){
      document.title = current.title;
    }
  }

  routeChange = (location, action)=>{
    let current = this.getCurrent(location);
    if(current){
      document.title = current.title;
    }
  }

  render() {
    return (
      <Provider {...stores}>
        <Views
          className={classnames({ 'theme-blue': UIState.isFefan })}
          onRouteInit={this.routeInit}
          onRouteChange={this.routeChange}
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
