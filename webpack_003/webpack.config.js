var path = require('path');

module.exports = {
	devtool: "false",
	entry: "./src/entry.js",
	output: {
		path: "./dist",
		filename: "bundle.js"
	},
	resolve: {
		alias: {
			abc: path.join(__dirname, 'src/a')
		}
	}
};