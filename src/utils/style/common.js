function isJson(obj){  
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;   
    return isjson;  
} 
export default {
	create(styles,OS,pxFun){
		var re = {};
		if(!isJson(styles)){
			return {};
		}
		for(var key in styles){
			var item = styles[key];
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