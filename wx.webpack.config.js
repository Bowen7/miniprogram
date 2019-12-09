const path = require("path");
const convertLoader = require("./src/convert");
module.exports = {
  entry: "./input/app.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "output"),
    filename: "app.js"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
          loader: "babel-loader"
        },
        {
          loader: path.resolve("./src/convert/app.js")
        }
      ]
    }]
  },
  resolve: {
    alias: {
      core: path.resolve("src/vue/src/core"),
      shared: path.resolve("src/vue/src/shared"),
      web: path.resolve("src/vue/src/platforms/web"),
      compiler: path.resolve("src/vue/src/compiler"),
      server: path.resolve("src/vue/src/server"),
      sfc: path.resolve("src/vue/src/sfc"),
      vue: path.resolve("src/vue/src/platforms/web/entry-runtime")
    }
  }
};
