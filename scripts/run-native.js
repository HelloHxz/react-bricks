const path = require('path');
const fs = require('fs');
var runNative = require('../node_modules/react-native/local-cli/cli.js');

var node_env = process.env.NODE_ENV||"development";
var br = /^win/.test(process.platform) ? "\r\n" : "\r";
fs.readFile("./appconfig.json",'utf-8',function(err,data){  
    if(err){  
        console.error("项目根目录下缺少appconfig.json文件");
    }else{  
        var context = null;
        try{
          context = JSON.parse(data);
        }catch(e){
          console.log(e);
          console.error("项目根目录下appconfig.json文件配置错误，需要为JSON格式，或者key值需要使用引号，请参照相应文档");
        }
        writeNativeEvn(context);
    }  
});

function writeNativeEvn(context){
  var config = context[node_env];
  if(!config){
    console.error("项目根目录下appconfig.json文件配置错误，没有相应的"+node_env+"配置");
    return;
  }

  var strArr = [];
  for(var key in config){
    strArr.push(key+"="+config[key]);
  }

  fs.writeFile("./.env", strArr.join(br), function(err) {
    if(err) {
      console.error("save .evn file faild!");
      return console.log(err);
    }else{
      console.log("save .evn file success!");
      runNative.run();
    }
  });
  
}