module.exports = function(env) {
    const path = require('path'),
        webpack = require('webpack'),
        cleanWebpackPlugin = require('clean-webpack-plugin'),
        settings = require('./statics/configSettings.js');
    
    return {
        entry: {
            library: './src/library.js'
        },
        output: {
            path: path.resolve(__dirname, "../dist"),
            filename: './[name].js',
            libraryTarget: 'umd',
            library: 'meteredRequestProcessor' //this will be the global variable to hook into
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
            new webpack.optimize.UglifyJsPlugin(settings.UglifyJsOptions),
            new webpack.DefinePlugin(settings.defineOptions)
        ],
        devtool: 'source-map',
        externals: {
            "file-saver": {
                commonjs: 'file-saver',
                commonjs2: 'file-saver',
                amd: 'file-saver',
                root: 'saveAs'
            }
        }
    };
};

