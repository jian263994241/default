var shims = {
  'react': 'global.React',
  'react-dom': 'global.ReactDOM',
  'react-router': 'global.ReactRouter'
}


fis.match('app.js', {
  parser: fis.plugin('browserify',{
    option:{
      shims: shims,
      externals:['grade', 'index']
    }
  })
})

fis.match('grade/routes.js',{
  parser: fis.plugin('browserify',{
    option:{
      expose:'grade',
      shims: shims
    }
  })
})

fis.match('index/routes.js',{
  parser: fis.plugin('browserify',{
    option:{
      expose:'index',
      shims: shims
    }
  })
})
