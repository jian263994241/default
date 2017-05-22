import React, {Component} from 'react'
import {render} from 'react-dom'

import Demo from './mod/demo'

window.$ = window.Dom7;


const router = {
  'index/demo':{
    title:'demo',
    mod: Demo
  }
};


render((
  <div className="views">
    <div className="view view-main">
      <div className="pages"></div>
    </div>
  </div>
), $('.framework7-root')[0], ()=>{

  window.app = new Framework7({
    reactComponent: router,
    root:'.framework7-root'
  });

  app.mainView = app.addView('.view-main');

  if (location.hash == '') {
    app.mainView.router.load({url: 'index/demo', animatePages: false, reload: true});
  }

})
