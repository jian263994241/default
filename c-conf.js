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


const exec = require('child_process').exec;

fis.on('release:end', function(file){
  if(fis.project.currentMedia() === 'prod2'){
    exec('tar -cvf release.zip ' + '_build/', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
    })
  }
})
