
import {render} from 'react-dom'



const $ = window.Dom7;


const router = {
  'index/*': {
    getMods : function(app, url, cb){
      app.showIndicator();
      $.getScript(__uri('/index/index.js'), ()=>{
        app.hideIndicator();
        cb(null, require('index').default);
      });
    }
  },
  'grade/*':{
    getMods : function(app, url, cb){
      app.showIndicator();
      $.getScript(__uri('/grade/index.js'), ()=>{
        app.hideIndicator();
        cb(null, require('grade').default);
      });
    }
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
