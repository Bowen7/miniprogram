const path = require('path');
module.exports = {
  entry: './test/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'compiler.vue.js'
    // libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/, //排除掉node_module目录
        use: {
          loader: 'babel-loader'
        }
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
      vue: path.resolve('src/vue/src/platforms/web/entry-compiler')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'test')
  }
};
