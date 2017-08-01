
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
      ACTIVECODE: function(file, basedir){
        return JSON.stringify('st02Code');
      }
    }
  }),
  guard: false
})

fis.media('st02').match('app.js', {
  parser: fis.plugin('browserify',{
    shims: shims,
    insertGlobalVars: {
      ACTIVECODE: function(file, basedir){
        return JSON.stringify('st02Code');
      }
    }
  }),
  guard: true  // 加密
})

fis.media('prod2').match('app.js', {
  parser: fis.plugin('browserify',{
    shims: shims,
    insertGlobalVars: {
      ACTIVECODE: function(file, basedir){
        return JSON.stringify('prod2Code');
      }
    }
  }),
  guard: true  // 加密
})


fis.match('default.html',{
  parser: fis.plugin('getconf',{
    confFile: {
      res: {
        react: 'https://img.99bill.com/seashell/webapp/lib/react/15.6.1/react.js'
      }
    }
  })
})

fis.media('prod2').match('default.html',{
  parser: fis.plugin('getconf',{
    confFile: {
      res: {
        react: 'https://img.99bill.com/seashell/webapp/lib/react/15.6.1/react.min.js'
      }
    }
  })
})
