const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const baseConfig = require('./webpack.base.config.js');

const devConfig = {
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, 'devtmp'),
        filename: 'assets/js/[name].js',
        publicPath: '/'
    },
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};
module.exports = merge(baseConfig, devConfig);