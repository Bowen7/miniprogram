const path = require("path");
module.exports = {
  entry: "./src/vue/src/platforms/web/entry-runtime.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "vue.web.js"
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