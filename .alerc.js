import path from 'path';

export default {
  entry: [require.resolve('core-js'), './src'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  ale: {
    html: {
      title: 'Example',
      mobile: true,
      appMountId: 'root',
      // scripts: [],
      // chunks: ['vendor', 'main'],
    },
    babelPlugins: [],
  },
};
