module.exports = function (config) {
    config.set({

        basePath: '',

        frameworks: ['mocha', 'chai'],

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'src/*.js',
            'test/*.js'
        ],

        exclude: [
        ],

        preprocessors: {
            'src/*.js': ['webpack', 'sourcemap'],
            'test/*.js': ['webpack', 'sourcemap']
        },

        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
                ]
            }
        },

        webpackMiddleware: {
            stats: {
                chunkModules: false,
                colors: true
            }
        },

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false,

        concurrency: Infinity
    });
};
