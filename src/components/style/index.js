import { Dimensions, PixelRatio,Platform } from 'react-native';
import Common from './common'

var Re = {
	OS:Platform.OS,
	isWeb:false,
	_init(){
		var screenInfo = Dimensions.get('window');
		this.screen.dpr = PixelRatio.get();
		this.screen.width = screenInfo.width*this.screen.dpr;
		this.screen.height  = screenInfo.height*this.screen.dpr;
		this.screen.originWidth = screenInfo.width;
		this.screen.originHeight = screenInfo.height;
	},
	create(styles){
		return Common.create(styles,this.OS,this.isWeb,this.px.bind(this));
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
		return (val/this.screen.dpr);
	},
	baseScreen:Common.baseScreen,
	screen:{
		dpr:0,
		width:0,
		height:0,
		originWidth:0,
		originHeight:0,
	},
}

Re._init();

export default Re;