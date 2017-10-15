const path = require('path');
const fs = require('fs');
var runNative = require('../node_modules/react-native/local-cli/cli.js');

var node_env = process.env.NODE_ENV||"development";
var br = /^win/.test(process.platform) ? "\r\n" : "\r";
const appPath = path.resolve(__dirname, '../app');




start();

function start(){
 // runNative.run();

 startWirteSvgFile(function(){

 });

 runNative.run();

    // startWirteSvgFile(function(){
    //   runNative.run();
    // });
  // startWriteThemeFile(function(){
  //   startWirteSvgFile(function(){
  //     startWriteConfig();
  //   });
  // });
}


/*仅仅写入运行变量就可以 具体的配置自己项目根据变量读取就可以
以后动态扩展应用 只需要传递运行变量就可以*/
function startWriteConfig(){
  var str = "evn="+node_env;
  fs.writeFile("./.env", str, function(err) {
    if(err) {
      console.error("save .evn file faild!");
      return console.log(err);
    }else{
      console.log("save .evn file success!");
      runNative.run();
    }
  });
}


/* 
  遍历app 目录 遍历项目 然后遍历项目模块
  每个模块目录下的assets/svg 目录 确定有的话开始读取
  然后写入到assets 到svgs.js 文件
*/
function startWirteSvgFile(successCallBack){
  // 生成js文件
  console.log("start create svg file!");

  ReadDir(appPath,function(error,dirName){
    if(!error){
      var DirPath = appPath+"/"+dirName;
      ReadDir(DirPath,function(err,modulesName){
        if(!err){
          var svgDir = DirPath+"/"+modulesName+"/assets/svg";
          writeSvgFile(svgDir);
        }
      })
    }
  });

  console.log("end");

  // readSvgs().then((data)=>{
  //   const svgFile = 'export default ' + JSON.stringify(Object.assign.apply(this, data));

  // }).catch((err) => {
  //   console.error(err);
  //   console.error("svg创建失败!");
  // });
}

function exists(_path){  
     return fs.existsSync(_path);  
}  

function writeSvgFile(dirpath){
  if(fs.existsSync(dirpath)){
    var Re = {};
    var files = fs.readdirSync(dirpath);
    files.forEach(function(filename) {
      var fnArr = filename.split(".");
      if(fnArr.length===2&&fnArr[1]==="svg"){
         var data = fs.readFileSync(dirpath+"/"+filename,'utf-8');
         data = data.replace(/<\?xml.*?\?>|<!--.*?-->|<path fill='#[a-zA-Z0-9]'|<!DOCTYPE.*?>/g, '');
         var filename_arr = filename.split("_");
         var iscolorful = false;
         if(filename_arr.length===2&&filename_arr[1]==='colorful.svg'){
           iscolorful = true;
         }
         if(!iscolorful){
           data = data.replace(/<path fill="#[a-zA-Z0-9]+"|<path/g, '<path fill="#ef473a"');
         }
         data = data.replace(/\sclass="[\w|\-|\_]*"/g,'');
         data = data.replace(/\sstyle="[\w|\-|\_]*"/g,'');
         Re[fnArr[0]] = data;
      }
    });
    fs.writeFileSync(dirpath+"/svgs.js", "export default " + JSON.stringify(Re));
  }
}


function ReadDir(dirpath,cb){
  var files = fs.readdirSync(dirpath);
  files.forEach(function(file) {
    var dp = dirpath+"/"+file;
    try{
      if(fs.lstatSync(dp).isDirectory()){
        cb(false,file);
      }
    }catch(e){
      console.log(e);
      cb(true,false);
    }
   }
  )
}

