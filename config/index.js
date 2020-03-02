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
      '/sdsec/web/secsermarket': {
        target: 'http://10.21.171.178:9151', // 安全市场（产品规格）
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '^/sdsec/web/secsermarket': '/sdsec/web/secsermarket' //需要rewrite重写的,
        }
      },
      '/sdsec/web/respool': {
        target: 'http://10.21.171.178:9001', // 资源池
        changeOrigin: true,
        pathRewrite: {
          '^/sdsec/respool': '/sdsec/respool' //需要rewrite重写的,
        }
      },
      '/sdsec/web/serchain': {
        target: 'http://10.21.171.178:9101', // 服务链
        changeOrigin: true,
        pathRewrite: {
          '^/sdsec/serchain': '/sdsec/serchain' //需要rewrite重写的,
        }
      },
      '/sdsec/web/order': {
        target: 'http://10.21.171.178:9051', // 订单
        changeOrigin: true,
        pathRewrite: {
          '^/sdsec/order': '/sdsec/order' //需要rewrite重写的,
        }
      },
      '/sdsec/web/overview': {
        target: 'http://10.21.171.178:9600',
        changeOrigin: true,
        pathRewrite: {
          '^/sdsec/overview': '/sdsec/overview' //需要rewrite重写的,
        }
      },
      '/sdsec/web/pub': {
        target: 'http://10.21.171.178:9850', // 任务管理
        changeOrigin: true,
        pathRewrite: {
          '^/sdsec/pub': '/sdsec/pub' //需要rewrite重写的,
        }
      },
      '/sdsec/web/securitypool': {
        target: 'http://10.21.171.178:9700', // 安全服务
        changeOrigin: true,
        pathRewrite: {
          '^/sdsec/web/securitypool': '/sdsec/web/securitypool' //需要rewrite重写的,
        }
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
