import React from 'react';
import View from '../view';
import Animated from '../animated'


var Styles= {
	bk:{
		position:"absolute",
		top:0,
		left:0,
		right:0,
		bottom:0,
		opacity:.4,
		backgroundColor:"#000"
	}
}
export default class Modal extends React.Component{

	render(){
		return <View style={{position:"fixed",zIndex:11111,top:0,left:0,right:0,bottom:0}}>

			<View style={Styles.bk}></View>
			{this.props.children}
		</View>
	}
}