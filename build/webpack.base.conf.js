var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require("webpack")
var glob = require('glob');
var fs = require("fs");
//initGrid();

//var compileModules = ['module_232/analysis_rule_2','module_232/confLink','module_232/main','module_232/bulletinNotice'];
var compileModules = ['module/main'];
//var compileModules = ['module/dataSearch'];
var entryConf =  {js:{},html:{}};
var pageMap = {};
initEntry();

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd


function initGrid(){
  var gridConf = {};
  var elist = glob.sync("src/components/gridster/*_grid/*.vue");
  elist.forEach(e=>{
    console.log("000000000000000000000000000000"+e);
})
  fs.writeFile("src/components/gridster/conf/gridConf.js"," export   default " +JSON.stringify(gridConf),  function(err) {
    if (err) {
      return console.error(err);
    }
  });
}
module.exports = {
  entryConf: entryConf,
  entry:entryConf.js,
  externals: {
    "bootstrap":"bootstrap",
    "echarts": "echarts",
    'jquery':"window.$",
    'babel-polyfill':'polyfill',
    'vue':'window.Vue',
    'vuex':'window.Vuex',
    'element-ui':'element',
    'element-ui':'e',
    'VueGridLayout':'VueGridLayout'
  },
  presets: [
    ['@vue/app', {
      polyfills: [
        'es6.promise',
        'es6.symbol'
      ]
    }]
  ],
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: 'module/chunk.[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue',
      'static':path.resolve(__dirname, '../static'),
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      bootstrap:"bootstrap",
      pace:"pace",
      nicescroll:"jquery.nicescroll",
      select2:"select2",
      gridster:"dsmorse-gridster"
    })
  ]
}
function initEntry(){
  compileModules.forEach(e=>{
    fmtToPageMap(e);
})
  for (var page in pageMap) {
    var htmlPath = pageMap[page];
    setEntries(htmlPath,entryConf);
  }
}

function fmtToPageMap(e){
  var pageFlag = e.indexOf("/") >=0;
  var moduleFlag = e.indexOf("#") ==0;
  if(pageFlag){
    setPagePath(e);
  }
  if(moduleFlag){
    var moduleName = e.substring(1);
    var mpath = "src/"+ moduleName+"/**/*.html";
    var pagelist = glob.sync(mpath);
    pagelist.forEach(p=>{
      var page = p.split("/")[2];
    pageMap[page] = p;
  })
  }
}

function setPagePath(e){
  var arr = e.split("\/");
  var moduleName = arr[0];
  var page = arr[1];
  var path = "src/"+moduleName+"/"+page+"/*.html";
  const htmls = glob.sync(path);
  pageMap[page] = htmls[0];
}




function getPathName(entry){
  var basename, tmp, pathname;
  basename = path.basename(entry, path.extname(entry));
  tmp = entry.split('/').splice(-3);
  pathname = tmp.splice(0, 1) + '/' + basename;
  return pathname;
}

function setEntries(entry,entries){
  var jsMap = entries.js;
  var htmlMap =  entries.html;
  var pathname = getPathName(entry);
  htmlMap[pathname] = entry;
  jsMap[pathname] =  [entry.replace(".html",".js")];
  console.log(jsMap[pathname]);

}
