const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 静态资源输出目录
exports.assetsPath = function (_path) {
  let assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  // 生产环境css打包进行压缩和开启生产模式sourceMap
  let cssLoader = {
    loader: 'css-loader',
    options: {
      // minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // 对于sass, less, stulys 需要配合各自对应的loader
  function generateLoaders (loader, loaderOptions) {
    let loaders = [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // 生产环境使用mini-css-extract-plugin 去拆解css文件
    if (options.extract) {
      return {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: false,
          reloadAll: true,
        }
      }
    } else {
      // 开发环境可使用style-loader去插入css
      return ['style-loader'].concat(loaders)
    }
  }

  // 引入scss全局变量
  function generateSassResourceLoader () {
    return [
      cssLoader,
      'sass-loader'
    ]
  }

  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    sass: generateSassResourceLoader(),
    scss: generateSassResourceLoader()
  }
}

// css 各种loader配置策略
exports.styleLoaders = function (options) {
  let output = []
  let loaders = exports.cssLoaders(options)
  for (let extension in loaders) {
    let loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  console.log(output, 'output')

  return output
}

exports.getVersion = function () {
  let date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset()) // toJSON 的时区补偿
  return date.toJSON().substr(0, 19).replace(/[-T:]/g, '')
}
