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
  })
})


fis.media('prod2').match('*', {
  domain: 'https://img.99bill.com',
  deploy: [
    fis.plugin('zip', {
      filename : 'release.zip'
    }),
    fis.plugin('local-deliver', {
      to: './_build'
    })  
  ]
})