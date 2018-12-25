const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require("webpack-merge");
const baseConfig = require('./webpack.base.config.js');

const prodConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].js',
        publicPath: '/'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ie8: true,
                },
                sourceMap: true,
            }),
        ],
    },
    mode: 'production'
};
module.exports = merge(baseConfig, prodConfig);