const path = require('path');
const webpack = require('webpack');
var fs= require('fs');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");
var bodyParser = require('body-parser')

function getEntryAndHtmlPlugin(){
  var siteArr = ["first"];
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

  //写入less  可以在这里修改主题 以及适配系数 默认是基于iphone6
  //writeCommonless();
 

  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';
  var entryAndHtmlPlugin = getEntryAndHtmlPlugin();
  var entry = entryAndHtmlPlugin.entry;
  var plugins= [
      
      new webpack.NamedModulesPlugin(),

      new webpack.LoaderOptionsPlugin({
          minimize: true
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
    var port =   arguments["1"].port||8080;
    var url = "http://"+ip+":"+port;
    entry.dev_patch = 'react-hot-loader/patch';
    entry.dev_client = 'webpack-dev-server/client?'+url;
    entry.dev_server= 'webpack/hot/only-dev-server';
  }
return {
  context: path.resolve(__dirname, 'example'),
  entry:entry,
  output: {
    filename: '[name].entry.js',
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

      // parse application/x-www-form-urlencoded
      app.use(bodyParser.urlencoded({ extended: false }))

      // parse application/json
      app.use(bodyParser.json())

      app.post('/postJSON', function(req, res) {
          // console.log(req.query.id);
          res.json(req.body||{});
      });

      app.get('/getJSON', function(req, res) {
          setTimeout(()=>{
            // res.status(500)
            // console.log(req.query.id);
            res.json({ name: 'vajoy' });
          },3000);
      });


    }
  },
  resolve: {
    plugins: [
      new DirectoryNamedWebpackPlugin({
        honorIndex: false, // defaults to false

        // respect "main" fields defined in package.json
        // if it's an Array, values will be used as name of the fields to check
        // defaults to true, which is the same as ["main"]
        honorPackage: ["main"],

        // if it's matching with resolving directory's path, plugin will ignore the custom resolving.
        // it can be string/regex or Array of string/regex.
        exclude: [path.resolve('./node_modules')],
     
        ignoreFn:function(webpackResolveRequest) {
          // custom logic to decide whether request should be ignored
          // return true if request should be ignored, false otherwise
          return false; // default
        },
        // define where the imported files will be resolving by DirectoryNamedWebpackPlugin.
        // it can be string/regex or Array of string/regex.
        include: [
          path.resolve('./src/*'),
        ],

        transformFn: function(dirName) {
            return "index.web.js";
        }
      })
    ]
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



function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            //console.log(path.dirname(dirname));
            mkdirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    });
}



function writeCommonless(){
   const rem = 75;
  /*
    这里可以配置框架的适配参数 iphone 6 为 75 iphone6p 为124.2 iphone为64
    rem 计算方法
    var docEl = document.documentElement;
    var dpr = window.devicePixelRatio || 1;
    console.log(docEl.clientWidth * dpr / 10) ;
  */
  mkdirs(path.join(__dirname, '/node_modules/xz-lightapp/css'),function(){
    fs.writeFile(path.join(__dirname, '/node_modules/xz-lightapp/css/common.less'), 
        `@textcolor:#333;
         @headerbordercolor:rgb(171,171,173);
         @backgroundcolor:#fff;
         @themecolor:rgb(10,96,254);
         @bordercolor:rgb(194,192,198);
         .px2rem(@name, @px){ @{name}: @px / ${rem} * 1rem;}
         .px2px(@name, @px){
            @{name}: round(@px / 2) * 1px;
            [data-dpr="2"] & {
                @{name}: @px * 1px;
            }
            [data-dpr="2.5"] & {
                @{name}: round(@px * 2.5 / 2) * 1px;
            }
            [data-dpr="2.75"] & {
                @{name}: round(@px * 2.75 / 2) * 1px;
            }
            [data-dpr="3"] & {
                @{name}: round(@px / 2 * 3) * 1px
            }
            [data-dpr="4"] & {
                @{name}: @px * 2px;
            }
        }
         .px2remtransfrom(@x,@y){
            transform: translate3d( @x / ${rem} * 1rem,  @y / ${rem} * 1rem, 0);
            -webkit-transform: translate3d( @x / ${rem} * 1rem,  @y / ${rem} * 1rem, 0);
         }`,
         function (err) {
          if (err) throw err;
          console.log("common.less write success!!");
      });
  });
}