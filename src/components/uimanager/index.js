import { NativeModules } from 'react-native'
const { UIManager } = NativeModules;
import StyleSheet from '../style'

export default {
	measure:function(target,cb){
		UIManager.measure(target,(x,y,width,height,left,top)=>{
			cb({
				x,
				y,
				width,
				height,
				left,
				top
			});
		});
	},
	setLayoutAnimationEnabledExperimental(){
		if(StyleSheet.OS==='android'){
			UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	},
	measureRef:function(target,cb){
		if(target){
			if(target.getNode){
				target = target.getNode();
			}
			target.measure((x,y,width,height)=>{
				cb({
					x,y,width,height
				});
			})
		}else{
			cb({
				x:0,
				y:0,
				width:0,
				height:0
			});
		}
	}
};