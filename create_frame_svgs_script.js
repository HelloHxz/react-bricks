const path = require('path');
const fs = require('fs');

start();

function start(){
 startWirteSvgFile(function(){
 });


}



/* 
  遍历app 目录 遍历项目 然后遍历项目模块
  每个模块目录下的assets/svg 目录 确定有的话开始读取
  然后写入到assets 到svgs.js 文件
*/
function startWirteSvgFile(successCallBack){
   var svgDir = "./src/components/icon/svgs";
   writeSvgFile(svgDir);
   console.log("success ");
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
         data = data.replace(/<path fill="#[a-zA-Z0-9]+"|<path/g, '<path fill="#ef473a"');
         data = data.replace(/\sclass="[\w|\-|\_]*"/g,'');
         data = data.replace(/\sstyle="[\w|\-|\_]*"/g,'');
         Re[fnArr[0]] = data;
      }
    });
    fs.writeFileSync("./src/components/icon/svgs.js", "export default " + JSON.stringify(Re));
  }
}


