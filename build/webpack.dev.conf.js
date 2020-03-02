var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')


var path = require('path');
var glob = require('glob');

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

 

module.exports = merge(baseWebpackConfig, {

  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  
  ]
})
 
 
var pages = baseWebpackConfig.entryConf.html;
for (var pathname in pages) { 
//	if(!baseWebpackConfig.compileAll && !baseWebpackConfig.checkCompileModule(pathname)) continue;
  console.log("filename:" + pathname + '.html');
  console.log("template:" + pages[pathname]);
  
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname],  
    minify: { 
      removeComments: true
    },
    inject: 'body',  
    chunks: [pathname]  
  };  
  
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
