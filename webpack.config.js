// Export the configurations for the webpack module.

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: __dirname	+ '/public',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	}
};
