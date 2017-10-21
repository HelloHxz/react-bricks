export default {
	measure:function(target,cb){
		const rect = target.getBoundingClientRect();
		cb(rect.left,rect.top,rect.width,rect.height,rect.left,rect.top);
	},
	setLayoutAnimationEnabledExperimental(){},
	measureRef:function(target,cb){
		if(target.node){
			//AnimateView
			target = target.node;
		}else{
			//View
			if(target.refs.node.node){
				target = target.refs.node.node.node;
			}
		}
		if(target){
			let rect = {left:0,top:0,width:0,height:0};
			if(target.getBoundingClientRect){
				rect = target.getBoundingClientRect();
			}
			cb(rect.left,rect.top,rect.width,rect.height);
		}else{
			cb(0,0,0,0);
		}
	}
};