import React from 'react';
import View from '../view';
import Text from '../text';
import StyleSheet from '../style';
import Animated from '../animated';
import Easing from '../easing'
import TouchableWithoutFeedback from '../touchableopacity'

export default class Switch extends React.Component{

	constructor(props){
		super(props);
		var v = !!props.value;
		this.state = {
			animateValue:new Animated.Value(v?1:0)
		}
	}

	componentWillReceiveProps(nextProps){

	}

	onPress(){
		var to = this.state.animateValue._value===1?0:1;
	  Animated.timing(
	    this.state.animateValue,
	    {
	      toValue: to,
	      duration:140,
	      easing:Easing.easeOut,
	    }
	  ).start(()=>{
	  })
	}

	render(){
		var space = 1;
		if(StyleSheet.isWeb){
			space =2;
		}

		var width = 112,height=66,space = 2;
		var pointerWidth = height-space*2;

		const drawerTranslateX = this.state.animateValue.interpolate({
	          inputRange: [0, 1],
	          outputRange:[StyleSheet._px((space)),StyleSheet._px(width-pointerWidth-space)],
	          extrapolate: 'clamp',
	    });

	    const backgroundColor = this.state.animateValue.interpolate({
	          inputRange: [0, 1],
	          outputRange:["rgb(192,192,192)","rgb(23, 226, 124)"],
	          extrapolate: 'clamp',
	    });

		return <TouchableWithoutFeedback 
			activeOpacity={1}
			onPress = {this.onPress.bind(this)}
			style={{
			position:"relative",
			width:StyleSheet.px(width),
			height:StyleSheet.px(height),
			overflow:"hidden",
		}}>
			<Animated.View 
				style={{
					width:"100%",
					height:"100%",
					borderRadius:StyleSheet.px(height/2),
					backgroundColor:backgroundColor
				}}
			></Animated.View>
			<Animated.View style={{
				position:"absolute",
				left:0,
				transform:[{
					translateX:drawerTranslateX
				}],
				top:StyleSheet.px(space),
				height:StyleSheet.px(pointerWidth),
				backgroundColor:"#fff",
				width:StyleSheet.px(pointerWidth),
				borderRadius:StyleSheet.px((pointerWidth)/2),
			}}/>
		</TouchableWithoutFeedback>
	}
}