module.exports = function(env) {
    const path = require('path'),
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
            extensions: ['.js', '.json']
        },
        plugins: [
            new cleanWebpackPlugin(['dist'], settings.cleanOptions)
        ],
        devtool: 'inline-source-map',
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

