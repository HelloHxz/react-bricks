import React from 'react';
import View from '../view';
import StyleSheet from '../style'

let Styles = StyleSheet.create({
	wrapper:{
		width:0,
		height:0,
		left:-1,
		top:-1,
		zIndex:10000,
		position:"absolute"
	}
});
class Toast extends React.Component{
	render(){
		return (<View style={Styles.wrapper}>
				<View style={StyleSheet.create({position:"absolute",width:200,height:100,top:200,left:200,backgroundColor:"#000",opacity:.8,borderRadius:30})}/>
			</View>)
	}
}

export default Toast;