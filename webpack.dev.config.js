const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
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
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            module: true,
                            localIdentName: '[local]--[hash:base64:6]'
                        }
                    },
                    "postcss-loader",
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
module.exports = merge(baseConfig, devConfig);