
fis.project.setProjectRoot('./src');

const shims = {
  'react': 'window.React',
  'react-dom': 'window.ReactDOM',
  'wonder': 'window.WONDER'
};

fis.match('app.js', {
  parser: fis.plugin('browserify',{
    shims: shims
  }),
  guard: false
})


fis.media('prod2').match('app.js', {
  parser: fis.plugin('browserify',{
    shims: shims
  }),
  guard: true  // 加密
})

fis.match('*.html',{
  parser: fis.plugin('getconf',{
    confFile: {
      res: {
        react: 'https://img.99bill.com/seashell/webapp/lib/react/16.2.0/react.js',
        wonderCss: 'https://img.99bill.com/seashell/webapp/lib/wonder/0.4.2/css/wonder.css',
        wonderJs: 'https://img.99bill.com/seashell/webapp/lib/wonder/0.4.2/js/wonder.js'
      }
    }
  })
})

fis.media('prod2')
.match('*.html',{
  parser: fis.plugin('getconf',{
    confFile: {
      res: {
        react: 'https://img.99bill.com/seashell/webapp/lib/react/16.2.0/react.min.js',
        wonderCss: 'https://img.99bill.com/seashell/webapp/lib/wonder/0.4.2/css/wonder.min.css',
        wonderJs: 'https://img.99bill.com/seashell/webapp/lib/wonder/0.4.2/js/wonder.min.js'
      }
    }
  }),
  release: '/seashell/webapp/default/$0'
});
