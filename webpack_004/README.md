webpack打包有时需要排除第三方库的打包，可以在webpack的配置文件中排除
```js

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
	resolve: {

	}
};

```