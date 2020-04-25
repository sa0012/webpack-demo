const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')

const devConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  devServer: {
    hot: true,
    inline: true,
    open: true,
    port: config.port,
    stats: "errors-only",
    contentBase: path.resolve(__dirname, '../dist'),
    proxy: config.dev.devServer
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      title: 'dev开发环境',
      favicon: path.resolve(__dirname, '../public/favicon.ico')
    })
  ]
})

module.exports = devConfig