// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/dataflow': {
        target: 'http://localhost:8688', // 接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/dataflow': '/dataflow' //需要rewrite重写的,
        }
      },
      '/ssa': {
        target: 'http://127.0.0.1:8282', // 接口域名
        changeOrigin: true, //是否跨域
        // target: 'http://127.0.0.1:8080', // 接口域名
        // changeOrigin: true, //是否跨域
        // pathRewrite: {
        //   '^/ssa': '/ssa' //需要rewrite重写的,
        // }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
