export default {
	measure:function(target,cb){
		const rect = target.getBoundingClientRect();
		cb(rect.left,rect.top,rect.width,rect.height,rect.left,rect.top);
	},
	measureRef:function(target,cb){
		if(target){
			const rect = target.getBoundingClientRect();
			cb(rect.left,rect.top,rect.width,rect.height);
		}else{
			cb(0,0,0,0);
		}
	}
};