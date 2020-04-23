const path = require('path')

module.exports = {
  build: {
    env: {
      NODE_ENV: 'production'
    },
    // 打包资源输出目录
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 静态资源存放目录
    assetsSubDirectory: 'static',
    // 文件输出目录， 默认在dist下， 也可以配置包裹多层目录
    assetsPublicPath: '/',
    // 可用来配置CDN目录
    CDN: '/',
    // sourceMap模式， 项目中一般情况下， 生产环境使用 source-map
    // 开发环境使用 cheap-module-eval-source-map
    productionSourceMap: true,
  },
  dev: {
    env: {
      NODE_ENV: 'development'
    },
    port: '3000',
    productionSourceMap: false,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    devServer: {
      '/h5-api': {
        target: 'https://baidu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/h5-api': '/'
        }
      }
    }
  }
}