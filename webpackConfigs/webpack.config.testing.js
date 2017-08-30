module.exports = function(env) {
    const path = require('path'),
        webpack = require('webpack'),
        cleanWebpackPlugin = require('clean-webpack-plugin'),
        HtmlWebpackPlugin = require('html-webpack-plugin'),
        settings = require('./statics/configSettings.js');

    return {
        entry: {
            main: './tests/project_tests.js'
        },
        output: {
            path: path.resolve(__dirname, "../tests/dist"),
            filename: 'project_tests_prepped.js',
            publicPath: "/"
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
            new cleanWebpackPlugin(['dist'], settings.cleanOptionsTesting),
            new HtmlWebpackPlugin(settings.htmlPluginOptions),
            new webpack.HotModuleReplacementPlugin()
        ],
        devtool: 'inline-source-map',
        externals: {},
        devServer: {
            hot: true, // Tell the dev-server we're using HMR
            contentBase: './tests/dist'
        }
    };
};

