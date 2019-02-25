const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCss = require('optimize-css-assets-webpack-plugin');
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
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 注意: priority属性
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",
                    chunks: "all",
                    minSize: 1,
                    priority: 0
                },
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                }
            }
        }
    },
    plugins: [
        new optimizeCss(),
        new MiniCssExtractPlugin({
            filename: "assets/css/[name]-[chunkhash:8].css"
        })
    ]
};
module.exports = merge(baseConfig, prodConfig);