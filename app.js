
import {render} from 'react-dom'



const $ = window.Dom7;


const router = {
  //用法2 路由配置在模块内
  // 'index/*': {
  //   //异步用法
  //   // getMods : function(app, url, cb){
  //   //   app.showIndicator();
  //   //   $.getScript(__uri('/index/index.js'), ()=>{
  //   //     app.hideIndicator();
  //   //     cb(null, require('index').default);
  //   //   });
  //   // }
  //   //同步用法
  //   // childRoutes : require('./index').default
  // }

  //用法1 : 经典用法
  'index/demo':{
    title:'demo',
    mod: require('./index/mod/demo').default
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
