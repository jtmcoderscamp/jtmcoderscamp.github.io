const path = require("path");

module.exports = {
	entry: ["babel-polyfill","./src/index.js"],
	watch: true,
	mode: "development",
	output: {
		path: path.resolve(__dirname, "docs"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}
			},
            {
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							context: path.resolve(__dirname, "src/")
						}
					}
				]
			}
		]
	}
};
