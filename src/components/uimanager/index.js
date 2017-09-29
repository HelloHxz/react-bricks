import { NativeModules } from 'react-native'
const { UIManager } = NativeModules;

export default {
	measure:function(target,cb){
		UIManager.measure(target,(x,y,width,height,left,top)=>{
			cb(x,y,width,height,left,top);
		});
	},
	measureRef:function(target,cb){
		if(target){
			target.measure((x,y,width,height)=>{
				cb(x,y,width,height);
			})
		}else{
			cb(0,0,0,0);
		}
	}
};