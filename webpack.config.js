const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
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
        exclude: /(node_modules)/, //排除掉node_module目录
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader'
        }
      },
      {
        test: /\.vu$/,
        loader: 'vue-loader'
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
      vue: path.resolve('src/vue/src/platforms/web/entry-runtime-with-compiler')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'public')
  },
  plugins: [new VueLoaderPlugin()]
};
