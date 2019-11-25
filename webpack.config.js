const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/, //排除掉node_module目录
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.worker\.js$/,
				use: { loader: "worker-loader" }
			}
		]
	},
	resolve: {
		alias: {
			core: path.resolve("src/vue/src/core"),
			shared: path.resolve("src/vue/src/shared"),
			web: path.resolve("src/vue/src/platforms/web"),
			compiler: path.resolve("src/vue/src/compiler"),
			vue: path.resolve("src/vue/src/platforms/web/entry-runtime-with-compiler")
		}
	},
	devServer: {
		contentBase: path.join(__dirname, "public")
	}
};
