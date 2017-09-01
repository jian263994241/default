import React, {Component} from 'react'
import {render} from 'react-dom'
import {App, View, Pages, Preloader, mobxReact, classnames} from 'wonder'

import UIState from './mod/store/UIState'

import IndexPage from './mod/index'
import OtherPage from './mod/demo'

const {observer, Provider} = mobxReact;

const stores = {UIState};

@observer
class Entry extends Component {

  render() {
    return (
      <Provider {...stores}>
        <App className={classnames({ 'theme-blue': UIState.isFefan })}>
          <View type="hash">
            <Pages exact path="/" component={IndexPage}/>
            <Pages path="/other" component={OtherPage}/>
          </View>
          <Preloader visible={UIState.showPreloader}></Preloader>
        </App>
      </Provider>
    );
  }
}

render(<Entry/>, document.querySelector('.root'));
