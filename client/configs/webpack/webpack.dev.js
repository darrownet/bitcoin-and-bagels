const { merge } = require('webpack-merge');
const paths = require('./paths');
const common = require('./webpack.common');

module.exports = merge(common, {
  output: {
    publicPath: paths.publicPath,
  },

  mode: 'development',

  target: "web",

  devtool: 'inline-source-map',

  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    open: ['/'],
    compress: true,
    hot: true,
    port: 8080,
    proxy: {
      '/api': 'http://localhost:8081',
    },
    static: {
      directory: paths.src,
      publicPath: paths.publicPath
    }
  },

  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ]
      }
    ]
  }
});
