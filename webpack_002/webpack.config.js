module.exports = {
	entry: "./src/app/index.js",
	output: {
		//path: __dirname,
		path: "./dist",
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: "style!css"
		}]
	}
};