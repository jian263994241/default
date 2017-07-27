const path = require('path');

fis.project.setProjectRoot(path.join(process.cwd(), '/src'));


const shims = {
  'react': 'global.React',
  'react-dom': 'global.ReactDOM',
  'wonder': 'window.WONDER'
}


fis.match('app.js', {
  parser: fis.plugin('browserify',{
    option:{
      shims: shims
    }
  }),
  guard: true  // 加密
})
