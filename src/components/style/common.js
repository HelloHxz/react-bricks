function isJson(obj){  
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;   
    return isjson;  
} 
export default {
	baseScreen:{
		name:"ipone6",
		width:375*2,
		height:677*2,
		dpr:2,
		rem:75,
		originWidth:375,
		originHeight:667,
	},
	convertTransformInWeb(re,values){
		var needConvert = true;
		var re = [];
		/*
			transform:[
				{translate:[]},
				{translateX:""},
				{rotate:"11deg"}
			]
			
			to

			transform:"translate3d(x,t,z) rotate(v)"
		*/
		for(var i=0,j=values.length;i<j;i++){
			if(!needConvert){
				break;
			}
			var item = values[i];
			for(var key in item){
				var value = item[key];
				if(typeof(value)==="string"||!isNaN(value)){
					re.push(key+"("+value+")");
				}else if(value instanceof Array){
					if(key==="translate"){
						key = "translate3d";
					}
					re.push(key+"("+value.join(",")+")");
				}else{
					needConvert = false;
					break;
				}
			}
			
		}
		if(needConvert){
			return re.join(" ");
		}
		return null;
	},
	create(styles,OS,isWeb,pxFun){
		var re = {};
		if(!isJson(styles)){
			return {};
		}
		for(var key in styles){
			var item = styles[key];
			if(typeof item ==='string'||!isNaN(item)){
				var key_arr = key.split("_");
				if(key_arr.length===2){
					var key_os = key_arr[1].toLowerCase();
					// webios webandroid web native nativeios nativeandroid android ios
					if((key_os==="ios"||key_os==="android")){
						if(OS!==key_os){
							continue;
						}
					}else if(key_os==='native'){
						if(isWeb){
							continue;
						}
					}else if(key_os==='web'){
						if(!isWeb){
							continue;
						}
					}else{
						if((isWeb&&key_os.indexOf("web")<0)||(!isWeb&&key_os.indexOf("native")<0)){
							continue;
						}
						if(key_os.indexOf(OS)<0){
							continue;
						}
					}

					key = key_arr[0];
				}
				if(typeof(item)==="string"){
					if(typeof(item.substring(0,1))==='string'){
						re[key] = item;
						continue;
					}
				}
				//todo ....特殊处理 border transform
				if(key==="zIndex"||key==="opacity"){
					re[key] = (item);
				}else{
					re[key] = pxFun(item);
				}
			}else if(key==='transform'){
				if(isWeb){
					var tstr = this.convertTransformInWeb(re,item);
					if(tstr){
						re[key] = tstr;
					}
				}else{
					re[key] = (item);
				}
			}else{
				if(isJson(item)){
					re[key] = this.create(item,OS,isWeb,pxFun);
				}
			}
		}
		return re;
	}
}