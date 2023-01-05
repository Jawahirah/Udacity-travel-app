const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const cssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const terserWebpackPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    optimization: {
        minimizer: [new terserWebpackPlugin({}), new cssMinimizerWebpackPlugin({})],
    }
    ,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /.scss$/,
                use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }, {

                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },


        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new miniCssExtractPlugin({ filename: "[name].css" }) // gives us a loader
        , new WorkboxPlugin.GenerateSW(),
        new copyPlugin({ patterns: [{ from: './src/client/assets', to: 'assets' }] })
    ]
}