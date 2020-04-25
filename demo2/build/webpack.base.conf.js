const path = require('path')
const config = require('../config')
const utils = require('./utils')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Happypack = require('happypack')
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'Happypack/loader?id=js',
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'test')
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: 'Happypack/loader?id=image',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'Happypack/loader?id=font',
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 第三方依赖
          // 设置优先级，首先抽离第三方模块
          priority: 1,
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          minSize: 0,
          minChunks: 1 // 最少引入了1次
        },
        //缓存组
        common: {
          //公共模块
          chunks: 'initial',
          name: 'common',
          minSize: 100, // 大小超过100个字节
          minChunks: 3 // 最少引入了3次
        }
      }
    },
    runtimeChunk: {
      name: 'mainifest'
    }
  },

  plugins: [
    new Happypack({
      id: 'js',
      use: ['babel-loader']
    }),

    new Happypack({
      id: 'image',
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          // 文件输出位置，命名规则 （static）
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }]
    }),

    new Happypack({
      id: 'font',
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          // 文件输出位置，命名规则（static）
          name: utils.assetsPath('fonts/[name].[hash:6].[ext]')
        }
      }]
    }),

    new CopyWebpackPlugin([
      {
        from: 'public/lib/*.js',
        to: utils.assetsPath('lib'),
        flatten: true,
      },
      {
        from: path.resolve(__dirname, '../public/favicon.ico'),
        to: path.resolve(__dirname, '../dist'),
        flatten: true
      }
    ]),

    // new HardSourceWebpackPlugin()
  ]
}