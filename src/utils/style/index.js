import { Dimensions, PixelRatio,Platform } from 'react-native';
import Common from './common'
export default {
	OS:Platform.OS,
	_init(){
		var screenInfo = Dimensions.get('window');
		this.screen.width = screenInfo.width;
		this.screen.height  = screenInfo.height;
		this.screen.dpr = PixelRatio.get();
	},
	create(styles){
		return Common.create(styles,this.OS,this.px.bind(this));
	},
	px(val){
		if(this.screen.dpr===0){
			this.screen.dpr = PixelRatio.get();
		}
		try{
			val = parseFloat(val);
		}catch(e){
			val = 0;
		}
		return val/this.screen.dpr;
	},
	screen:{
		dpr:0,
		width:0,
		height:0
	},
}