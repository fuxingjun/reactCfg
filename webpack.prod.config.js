const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require("webpack-merge");
const baseConfig = require('./webpack.base.config.js');

const prodConfig = {
    entry: {
        index: path.resolve(__dirname, './src/entry/index.jsx')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name]-[chunkhash:8].js',
        publicPath: '/'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ie8: true,
                }
            }),
        ],
    },
    mode: 'production'
};
module.exports = merge(baseConfig, prodConfig);