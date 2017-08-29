module.exports = function(env) {
    const path = require('path'),
        cleanWebpackPlugin = require('clean-webpack-plugin'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        settings = require('./statics/configSettings.js'),
        ExtractTextPlugin = require('extract-text-webpack-plugin'),
        extractCSS = new ExtractTextPlugin(settings.styleSheetNames.dev.css),
        extractSCSS  = new ExtractTextPlugin(settings.styleSheetNames.dev.scss);

    return {
        entry: {
            main: '../tests/project_tests.js'
        },
        output: {
            path: path.resolve(__dirname, "../tests"),
            filename: `${packageData.name}_tests.js`,
        },
        module:{
            rules:[
                {
                    test: /\.js$/,
                    //exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: settings.babelOptions
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.css', '.json']
        },
        plugins: [
            new cleanWebpackPlugin(['dist'], settings.cleanOptions),
            new HtmlWebpackPlugin(settings.htmlPluginOptions),
            extractCSS,
            extractSCSS
        ],
        devtool: 'inline-source-map',
        externals: {}
    };
};

