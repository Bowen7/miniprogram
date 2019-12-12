const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { entryPath } = require('./config');
module.exports = {
  entry: entryPath,
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'output'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: path.resolve('./src/convert/app.js')
          }
        ]
      },
      {
        test: /\.wxml$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: path.resolve('./src/convert/wxml.js')
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      core: path.resolve('src/vue/src/core'),
      shared: path.resolve('src/vue/src/shared'),
      web: path.resolve('src/vue/src/platforms/web'),
      compiler: path.resolve('src/vue/src/compiler'),
      server: path.resolve('src/vue/src/server'),
      sfc: path.resolve('src/vue/src/sfc'),
      vue: path.resolve('src/vue/src/platforms/web/entry-runtime')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'output')
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      wx: [path.resolve(__dirname, 'src/wx'), 'wx'],
      Page: [path.resolve(__dirname, 'src/wx'), 'Page'],
      Component: [path.resolve(__dirname, 'src/wx'), 'Component']
    })
  ]
};
