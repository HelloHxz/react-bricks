export default {
	measure:function(target,cb){
		const rect = target.getBoundingClientRect();
		cb({
			x:rect.left,
			y:rect.top,
			width:rect.width,
			height:rect.height,
			left:rect.left,
			top:rect.top
		});
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
			cb({
				x:rect.left,
				y:rect.top,
				width:rect.width,
				height:rect.height,
				left:rect.left,
				top:rect.top
			});
		}else{
			cb({
				x:0,
				y:0,
				width:0,
				height:0,
				left:0,
				top:0
			});
		}
	}
};