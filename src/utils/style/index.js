import { Dimensions, PixelRatio } from 'react-native';

export default {
	_init(){
		var screenInfo = Dimensions.get('window');
		this.screen.width = screenInfo.width;
		this.screen.height  = screenInfo.height;
		this.screen.dpr = PixelRatio.get();
	},
	create(){

	},
	px(val){
		
	},
	screen:{
		dpr:0,
		width:0,
		height:0
	},
}