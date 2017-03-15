var shims = {
  'react': 'global.React',
  'react-dom': 'global.ReactDOM',
  'react-router': 'global.ReactRouter',
  'react-redux': 'global.ReactRedux'
}


fis.match('app.js', {
  parser: fis.plugin('browserify',{
    option:{
      shims: shims,
      // externals:['index']
    }
  })
})



// fis.match('index/index.js',{
//   parser: fis.plugin('browserify',{
//     option:{
//       expose:'index',
//       shims: shims
//     }
//   })
// })
