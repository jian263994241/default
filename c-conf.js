
fis.project.setProjectRoot('./src');

const shims = {
  'react': 'global.React',
  'react-dom': 'global.ReactDOM',
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
