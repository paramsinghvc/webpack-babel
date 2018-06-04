const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: ['./src/index.js'],
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: ['node_modules'],
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html',
        })
    ],
    devServer: {
        hot: true,
        // inline: true,
        port: 7777
        // contentBase: path.resolve(__dirname, 'client')
    }
}