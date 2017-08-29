const projectInfo = require('../../package.json');
const statics = require('./spInfo.js');
const path = require('path');

module.exports = {
	htmlPluginOptions: {
        inject: false,
        template: "./tests/index.html"
	},
	cleanOptions: {
        root: path.resolve(__dirname, "../../")
	},
	UglifyJsOptions: {
		sourceMap: true
	},
	defineOptions: {
		'process.env': {
			'NODE_ENV': JSON.stringify('production')
		}
	},
	cssloaderOptionsProd: {
		minimize: true,
		sourceMap: true
	},
	babelOptions: {
		"compact": false,
		"presets": [
			["env", {"modules": false}],
			"stage-0"
		],
		plugins: []
	},
	styleSheetNames: {
		dev: {
			css: './stylesheets/[name].css',
			scss: './stylesheets/[name]-scss.css'
		},
		prod: {
			css: './stylesheets/[name].[chunkhash:8].css',
			scss: './stylesheets/[name].[chunkhash:8]-scss.css'
		}
	}
};