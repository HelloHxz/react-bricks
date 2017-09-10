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
	create(styles,OS,pxFun){
		var re = {};
		if(!isJson(styles)){
			return {};
		}
		for(var key in styles){
			var item = styles[key];
			var key_arr = key.split("_");
			if(key_arr.length===2){
				var key_os = key_arr[1].toLowerCase();
				if((key_os!==OS&&key_os!=='native')||(key_os==="native"&&OS==='web')){
					continue;
				}
				key = key_arr[0];
			}
			if(isJson(item)){
				re[key] = this.create(item,OS,pxFun);
			}else{
				if(typeof(item)==="string"){
					if(typeof(item.substring(0,1))==='string'){
						re[key] = item;
						continue;
					}
				}
				re[key] = pxFun(item);
			}
		}
		return re;
	}
}