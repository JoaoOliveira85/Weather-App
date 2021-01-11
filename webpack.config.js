var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	entry: "./src/index.js",
	devServer: {
		contentBase: "./dist",
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Weather App",
			filename: "index.html",
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,

				use: ["style-loader", "css-loader"],
			},
		],
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js",
	},
};
