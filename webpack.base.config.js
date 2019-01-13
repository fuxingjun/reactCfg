const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.e\.js$/,
                use: ['script-loader']
            },//在全局上下文执行一次js脚本
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100,
                            name: 'assets/image/[name].[ext]',
                        },
                    },
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src/common'),
            path.resolve(__dirname, 'src/components'),
            path.resolve(__dirname, './')
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom',
            PropTypes: 'prop-types'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/template/index.html',
            minify: {
                // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: false, // 删除空白符与换行符
            },
            chunks: ['index'],
        })
    ]
}