const path = require('path')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: config.assetsRoot, //必须是绝对路径
    filename: 'js/[name].[chunkhash:8].js',
    // 这个可以用来配置CDN路径
    // filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extract: true
    })
  },
  devtool: 'source-map',
  // 配置排除非打包文件， 例如react, react-dom, react-router, axios可以走CDN的方式加载
  // 节省打包时间， 减小vendor包的大小
  externals: {},
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      version: utils.getVersion(),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
    })
  ]
})