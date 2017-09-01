
fis.project.setProjectRoot('./src');

const shims = {
  'react': 'global.React',
  'react-dom': 'global.ReactDOM',
  'wonder': 'window.WONDER'
};

fis.match('app.js', {
  parser: fis.plugin('browserify',{
    shims: shims,
    insertGlobalVars: {
      merchantCode: function(file, basedir){
        return JSON.stringify('10013489476');
      }
    }
  }),
  guard: false
})

fis.media('st02').match('app.js', {
  parser: fis.plugin('browserify',{
    shims: shims,
    insertGlobalVars: {
      merchantCode: function(file, basedir){
        return JSON.stringify('10013489476');
      }
    }
  }),
  guard: true  // 加密
})

fis.media('prod2').match('app.js', {
  parser: fis.plugin('browserify',{
    shims: shims,
    insertGlobalVars: {
      merchantCode: function(file, basedir){
        return JSON.stringify('10024091065');
      }
    }
  }),
  guard: true  // 加密
})


fis.match('*.html',{
  parser: fis.plugin('getconf',{
    confFile: {
      res: {
        react: 'https://img.99bill.com/seashell/webapp/lib/react/15.6.1/react.js'
      }
    }
  })
})

fis.media('prod2')
.match('*.html',{
  parser: fis.plugin('getconf',{
    confFile: {
      res: {
        react: 'https://img.99bill.com/seashell/webapp/lib/react/15.6.1/react.min.js'
      }
    }
  }),
  release: '/seashell/webapp/default/$0'
});
