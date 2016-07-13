var path = require('path');

var webapck = require('webpack');

// var ignoreFiles = new webapck.IgnorePlugin(/\.\/vue.js$/);


module.exports = {
	devtool: "false",
	entry: "./src/app/index.js",
	output: {
		path: "./dist",
		filename: "bundle.js"
	},
	externals: {
		'vue': 'window.vue',
	},
	// plugins: [
	// 	ignoreFiles
	// ],
	resolve: {
		alias: {
			vue: path.join(__dirname, 'src/vendor/vue/vue.min')
		}
	}
};