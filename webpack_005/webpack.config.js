var path = require('path');

module.exports = {
	devtool: "false",
	entry: {
		// 这个例子中有两个独立的页面，为了试验按需加载所以定义两个入口
		// 这样会分别为每个入口点生成一套bundle.js 和 id.chunk.js
		home: './src/app/home/index.js',
		sysuser: './src/app/sysuser/index.js'
	},
	output: {
		path: path.join(__dirname, "dist"),
		filename: '[name].bundle.js',
		/*
		因为例子中用到了code splitting，所以要指定一个publicPath
		告诉浏览器去哪个地址去加载chunk文件
		*/
		publicPath: "../../../dist/",
		chunkFilename: "[id].chunk.js"
	},
	externals: {
		'vue': 'window.vue',
	},
	resolve: {
		alias: {
			vue: path.join(__dirname, 'src/vendor/vue/vue')
		}
	}
};