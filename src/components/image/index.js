import {Image} from 'react-native'
import React from 'react';
import Theme from '../theme'
import PlatForm from '../platform'
import View from '../view'


const k = ['width','height','backgroundColor',
'maxHeight','maxWidth','minWidth','minHeight',
'borderRadius','margin','marginBottom','marginTop','marginLeft','marginRight'];

function AutoResizeImage(w,h,maxWidth,maxHeight){  
	var hRatio;  
	var wRatio;  
	var Ratio = 1;  
	wRatio = maxWidth / w;  
	hRatio = maxHeight / h;  
	if (maxWidth ==0 && maxHeight==0){  
		Ratio = 1;  
	}else if (maxWidth==0){
		if (hRatio<1){
			Ratio = hRatio; 
		} 
	}else if (maxHeight==0){  
		if (wRatio<1) {
			Ratio = wRatio;  
		}
	}else if (wRatio<1 || hRatio<1){  
		Ratio = (wRatio<=hRatio?wRatio:hRatio);  
	}  
	if (Ratio<1){  
		w = w * Ratio;  
		h = h * Ratio;  
	}  
	return {width:w,height:h}
}  


export default class Img extends React.Component{


	constructor(props){
		super(props);
		this.resizeMode = props.resizeMode||"contain";
		
		this.state = {
			resizeStyle:{}
		}
	}
	onLoadEnd(e){
		
	}
	onLoad(e){
		if(this.resizeMode==='bl'){
			var style = this.props.style||{};
			var mw = e.nativeEvent.source.width;
			var mh =  e.nativeEvent.source.height;
			if(PlatForm.OS==='android'){
				mw = style.width||style.maxWidth||mw;
				mh = style.height||style.maxHeight||mh;
			}
			Image.getSize(e.nativeEvent.source.url,(w,h)=>{
				console.log(w,h);
				console.log(mw,mh);
				console.log(AutoResizeImage(w,h,mw,mh))
				this.setState({
					resizeStyle:AutoResizeImage(w,h,mw,mh)
				})
			});
		}
	}
	render(){
		var imgStyle = {};
		var style = this.props.style||{};
		var wrapperStyle = {backgroundColor:Theme.image_background_color,overflow:"hidden"};
		var imageStyle = {width:"100%",height:"100%"};
		for(var key in style){
			if(k.indexOf(key)>=0){
				wrapperStyle[key] = style[key];key
				if(key==='borderRadius'){
					imageStyle[key] = style[key]
				}
			}else{
				imageStyle[key] = style[key]
			}
		}
		var rm = {resizeMode:this.resizeMode};
		if(this.resizeMode==='bl'){
			rm = {resizeMode:"contain"}
		}
		return <View style={{...wrapperStyle,...this.state.resizeStyle}}>
			<Image
			onLoadEnd = {this.onLoadEnd.bind(this)}
			onLoad = {this.onLoad.bind(this)}
			{...this.props} style={{...imageStyle,...imgStyle,...this.state.resizeStyle}} {...rm}/></View>
	}
}