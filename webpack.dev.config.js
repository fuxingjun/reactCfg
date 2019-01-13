const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseConfig = require('./webpack.base.config.js');

const devConfig = {
    entry: {
        index: ['webpack-hot-middleware/client?reload=true', path.resolve(__dirname, './src/entry/index.jsx')],
    },
    devtool: 'cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, 'devtmp'),
        filename: 'assets/js/[name].js',
        publicPath: '/'
    },
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
module.exports = merge(baseConfig, devConfig);