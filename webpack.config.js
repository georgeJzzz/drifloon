const path = require("path");
const pkg = require("./package.json");

const config = {
	entry: "./drifloon/main.ts",
	mode: "production",
	output: {
		path: path.resolve("./dist"),
		filename: `drifloon.${pkg.version}.js`,
		library: "M",
		libraryTarget: "umd2"
	},

	resolve: {
		extensions: [".ts", ".js"]
	},

	module: {
		rules: [
			{
				use: "ts-loader",
				test: /\.ts$/,
				exclude: /node_modules/
			}
		]
	}
};

module.exports = config;
