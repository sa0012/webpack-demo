const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), //必须是绝对路径
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: '/' //通常是CDN地址
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/ //排除 node_modules 目录
      },
      {
        test: /\.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: false,
              reloadAll: true,
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')()
                ]
              }
            }
          },
          'sass-loader'],
          exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              esModule: false
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              esModule: false
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      config: config.dev
    }),

    // 拆分js中引入的css文件，避免打包到js中
    // hash chunkhash contenthash 区别
    // hash跟整个项目的构建相关， 只有有文件修改， 重新构建的时候就会生成新的hash, 并且会修改全部使用此种策略的文件

    // chunkhash 根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值
    // 对于多入口的项目， 打包的时候只会对修改的入口重新生产hash

    // contenthash 由文件内容产生的hash值， chunkhash带来的问题是， 同一文件中引入了js, css文件， 通过mini-css-extract-plugin 把css文件从js文件中
    // 分离出来，但是由于 chunkhash 是根据入口文件进行依赖分析， 所以一旦改动js文件， 即使没有改变css， 也会被标记上新的chunkhash
    // contenthash 根据独立文件内容来产生hash， 所以拆分后的css文件成为独立文件， 不再跟引入时的js文件相关
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),

    // 将可用于生产的源码库直接copy过去， 无须打包， 节省打包时间
    new CopyWebpackPlugin([
      {
        from: 'public/js/*.js',
        to: path.resolve(__dirname, 'dist', 'lib/js'),
        flatten: true,
      },
      {
        from: 'public/lib/*.js',
        to: path.resolve(__dirname, 'dist', 'lib'),
        flatten: true,
      }
    ]),

    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
    })
  ]
}
