const path = require('path');
const webpack = require('webpack');
var mockData = require("./mock")
var fs= require('fs');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');



function getEntryAndHtmlPlugin(){
  var siteArr = ["demo"];
  var re = {entry:{},htmlplugins:[]};
  for(var i=0,j=siteArr.length;i<j;i++){
    var siteName = siteArr[i];
    re.entry[siteName] = "./"+siteName+"/index.js";//js多入口字典对象
    re.htmlplugins.push(new HtmlWebpackPlugin({
        filename: siteName+'.html', //打包出来的html名字
        template: './'+siteName+'/index.html', //模版路径
        inject: 'body' ,
        chunks:[siteName],//js注入的名字
        hash:true
      }));
  }
  return re;
}



module.exports = function (env) {

  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';
  var entryAndHtmlPlugin = getEntryAndHtmlPlugin();
  var entry = entryAndHtmlPlugin.entry;
  var plugins= [

      
      new webpack.NamedModulesPlugin(),

      new webpack.LoaderOptionsPlugin({
          minimize: true
      }),
      new webpack.DefinePlugin({
          __DEV__: true,
          huxiaozhong:JSON.stringify("hshsh"),
          SEVER:{
            path:JSON.stringify("22"),
            url:JSON.stringify("1333")
          }
      }),
      //【主要是为了使用变量引用本地图片】这个静态文件 拷贝到dist的imgs下  其他的js boundle也是拷贝至dist下 
      //所以在js通过!!!变量!!!(通过字符串变量引用本地的图片)引用图片的时候直接 ./imgs/xxx.jpg就可以
      //【css less中以及import 图片资源 会由url-loader完成】
      // new CopyWebpackPlugin([
      //   {from:"./site1/imgs",to:"imgs"}
      //   ]),
  ];

  plugins = plugins.concat(entryAndHtmlPlugin.htmlplugins);

  if(!isProd){
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  
  
  if(!isProd){
    var ip = arguments["1"].host||"localhost";
    var port =   arguments["1"].port||8000;
    var url = "http://"+ip+":"+port;
    entry.dev_patch = 'react-hot-loader/patch';
    entry.dev_client = 'webpack-dev-server/client?'+url;
    entry.dev_server= 'webpack/hot/only-dev-server';
  }

return {
  context: path.resolve(__dirname, 'app'),
  entry:entry,
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: !isProd ? '[name].bundle.js' : '[name].[chunkhash:8].min.js',
    // the output bundle

    path: path.resolve(__dirname, 'dist'),

    publicPath: isProd?'./':'/'
  },
 

  devtool: isProd ? 'hidden-source-map' : 'eval',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: path.resolve(__dirname, 'dist'),
    // match the output path
    publicPath: isProd?'./':'/',
    setup(app){  
      mockData(app);
    }
  },
  resolve: {
     mainFiles: ["index.web","index"],
     modules: [path.resolve(__dirname, "src"), "node_modules"]
  },


  module: {
    rules: [
      {
        test: /\.jsx?$/,

        use: {
          loader:'babel-loader',

          options:{

            "presets": [
              ["es2015", {"modules": false}],
              "react",
              "stage-0"
            ],
            "plugins": [
              "transform-decorators-legacy","transform-class-properties","react-hot-loader/babel",[
                "transform-runtime",
                {
                  "helpers": false,
                  "polyfill": false,
                  "regenerator": true,
                  "moduleName": "babel-runtime"
                }
              ]
            ]
          }
        },
        
      },
      {
        test: /\.css$/,
       
        use: [ 'style-loader', 
            {
                loader: "css-loader",
              
            },{
              loader:"postcss-loader",
               options: {
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('autoprefixer')(),
                ]
              }
            } ],
      },
      { 
        test: /\.(png|jpg|jpeg|gif|woff)$/, 
        loader: 'url-loader?limit=6144&name=imgs/[path][name].[ext]'
      },
       {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
            test: /\.less$/,
           
            use: [{
                loader: "style-loader" 
            }, {
                loader: "css-loader" ,
                 options:{
                   minimize:true
                },
            }, 
            {
              loader:"postcss-loader",
               options: {
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('autoprefixer')(),
                ]
              }
            },
            {
                loader: "less-loader" 
            }]
      }
    ],
  },

  plugins:plugins,
};
}


