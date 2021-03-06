const path = require('path');
var libraryName = 'angular-ip21';
var outputFile = libraryName + '.js';
var plugins = [];

const config = {
    entry: './src/index.js',
    devtool: 'source-map',
    externals: {
        angular: 'angular'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins
};

module.exports = config;