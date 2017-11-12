import {Image} from 'react-native'
import React from 'react';
import Theme from '../theme'
import View from '../view'


const k = ['width','height','backgroundColor',
'maxHeight','maxWidth','minWidth','minHeight',
'borderRadius','margin','marginBottom','marginTop','marginLeft','marginRight'];
export default class Img extends React.Component{

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
		return <View style={wrapperStyle}><Image {...this.props} style={{...imageStyle,...imgStyle}}/></View>
	}
}