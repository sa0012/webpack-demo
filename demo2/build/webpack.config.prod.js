const path = require('path')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const glob = require('glob')
const utils = require('./utils')
const config = require('../config')
const baseWebpackConfig = require('./webpack.base.conf')

const smp = new SpeedMeasureWebpackPlugin()
let expandPlugin = []

if (!!process.env.analyzer) {
  expandPlugin.push(new BundleAnalyzerPlugin({
    analyzerPort: 8888
  }))
}

const prodConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: config.assetsRoot, //必须是绝对路径
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    // 这个可以用来配置CDN路径
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: true,
      extract: true
    })
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'error' : false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js')
    }
  },
  devtool: 'source-map',
  // 配置排除非打包文件， 例如react, react-dom, react-router, axios可以走CDN的方式加载
  // 节省打包时间， 减小vendor包的大小
  externals: {},
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        // 是否将插件信息打印到控制台
        canPrint: true
      })
    ]
  },
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
      filename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
    }),

    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`,  { nodir: true }),
    }),
    ...expandPlugin
  ]
})

module.exports = smp.wrap(prodConfig)