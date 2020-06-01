const apiMocker = require('mocker-api');
const path = require('path');
const pkg = require('./package.json');

exports.default = {
  entry: [require.resolve('core-js'), './src'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      'mobx-react': 'mobx-react-lite',
    },
  },
  devServer: {
    compress: true,
    proxy: {
      '/api': {
        target: 'https://xxx.com',
        changeOrigin: true,
      },
    },
    before(app) {
      apiMocker(app, path.resolve('./mocker/index.js'));
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor',
          priority: -10,
          enforce: true,
        },
      },
    },
  },
  ale: {
    html: {
      title: '\u200E',
      mobile: true,
      appMountId: 'root',
      scripts: [
        'https://img.99bill.com/res/j/env/70a353fcf1150dc1.js',
        'https://img.99bill.com/seashell/webapp/lib/kuaiqian/2.2.6/kuaiqian.min.js',
      ],
      chunks: ['vendor', 'main'],
    },
    define: {
      APIURL: JSON.stringify('/'),
    },
    babelPlugins: [
      [
        'import',
        {
          libraryName: 'antd-mobile',
          style: true,
        },
        'antd-mobile',
      ],
      [
        'import',
        {
          libraryName: 'lodash',
          camel2DashComponentName: false,
          libraryDirectory: '',
        },
        'lodash',
      ],
      [
        'import',
        {
          libraryName: 'util-helpers',
          camel2DashComponentName: false,
        },
        'util-helpers',
      ],
      [
        'import',
        {
          libraryName: '@wonder-ui/core',
          libraryDirectory: 'components',
          camel2DashComponentName: false,
        },
        '@wonder-ui/core',
      ],
    ],
  },
};

// mode: 'production',
exports.prod = {
  output: {
    filename: 'res/j/app.[hash].js',
    chunkFilename: 'res/j/[id][chunkhash].js',
    publicPath: 'https://img.99bill.com/',
  },
  ale: {
    html: {
      // filename: 'seashell/webapp/index.html',
    },
    define: {
      APIURL: JSON.stringify('https://baidu.com/'),
    },
    css: {
      filename: 'res/c/[hash].css',
      chunkFilename: 'res/c/[chunkhash].chunk.css',
    },
    fileOptions: {
      outputPath: 'res/i',
    },
    zip: {
      filename: `${pkg.name}@${pkg.version}.zip`,
    },
  },
};
