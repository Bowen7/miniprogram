const path = require("path");
module.exports = {
	entry: "./src/vue/src/platforms/web/entry-runtime-with-compiler.js",
	mode: "development",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "vue.web.js",
		libraryTarget: "commonjs2"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/, //排除掉node_module目录
				use: {
					loader: "babel-loader"
				}
			}
		]
	},
	resolve: {
		alias: {
			core: path.resolve("src/vue/src/core"),
			shared: path.resolve("src/vue/src/shared"),
			web: path.resolve("src/vue/src/platforms/web"),
			compiler: path.resolve("src/vue/src/compiler"),
			server: path.resolve("src/vue/src/server"),
			sfc: path.resolve("src/vue/src/sfc"),
			vue: path.resolve("src/vue/src/platforms/web/entry-runtime-with-compiler")
		}
	}
};
