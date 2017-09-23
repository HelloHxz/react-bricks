import React from 'react';
import {
  Text,View,Animated,Easing,
  TouchableWithoutFeedback
} from 'react-native';
import StyleSheet from '../style'

/*
	positionRect
	config
*/

var styles = StyleSheet.create({
	wrapper:{
		position:"absolute",
		backgroundColor:"transparent",
		overflow:"hidden",
		zIndex:1000
	},
	wrapperHide:{
		left:-1000,
		width:0,
		height:0
	},
	wrapperShow:{
		top:0,
		left:0,
		right:0,
		bottom:0,
	},
	bkLayer:{
		position:"absolute",
		top:0,
		left:0,
		right:0,
		bottom:0,
		backgroundColor:"#000",
		overflow:"hidden",
		opacity:0.5,
		zIndex:1,
	},
	layer:{
		width:"100%",
		height:0,
		backgroundColor:"#fff",
		zIndex:2,
		position:"absolute",
		top:0
	}
});
class PopLayer extends React.Component {

	bkPress(){
			Animated.timing(
			        this.state.openValue,
			        {
			          toValue: 0,
			          duration:300,
			          bounciness: 0, 
			          easing:Easing.ease,
			          restSpeedThreshold: 1
			        }
			  ).start(()=>{
			  	this.setState({isShow:false,isShowVisiblity:false});
			  })
	
	}

	constructor(props){
		super(props)
		//config {key:"",dirction:"bottom",cache:true}
		this.state = {
			config:null,
			openValue: new Animated.Value(0),
			isShowVisiblity:false, // 显示背景 然后动画
			isShow:false
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({isShowVisiblity:true,isShow:true},function(){
			setTimeout(()=>{
				this.setState({isShowVisiblity:false});
				Animated.timing(
			        this.state.openValue,
			        {
			          toValue: 1,
			          duration:300,
			          bounciness: 0, 
			          easing:Easing.ease,
			          restSpeedThreshold: 1
			        }
			      ).start()
			},20)
		});
    }


	render() {
		const popHeight = StyleSheet.px(400);
		const {
		  openValue
		} = this.state;
		let drawerTranslateY = null;
		let overlayOpacity = 0;

		if(this.state.isShowVisiblity){
			drawerTranslateY = -popHeight;
		}else{
			drawerTranslateY = openValue.interpolate({
			    inputRange: [0, 1],
			    outputRange:[-popHeight,0],
			    extrapolate: 'clamp',
			});
			overlayOpacity = openValue.interpolate({
		      inputRange: [0, 1],
		      outputRange: [0, 0.5],
		      extrapolate: 'clamp',
		    });
		}
		const animateStyle={transform:[{"translateY":drawerTranslateY}],height:popHeight};
	    const animatedOverlayStyles = { opacity: overlayOpacity };
	    const wrapperStyle = this.state.isShow?styles.wrapperShow:styles.wrapperHide;
		return (
		  <View style={{...styles.wrapper,...wrapperStyle}}>
		  	<TouchableWithoutFeedback onPress={this.bkPress.bind(this)} >
		  		<Animated.View style={{...styles.bkLayer,...animatedOverlayStyles}}/>
		  	</TouchableWithoutFeedback>
		    <Animated.View style={{...styles.layer,...animateStyle}}></Animated.View>
		  </View>
		);
	}
}

export default PopLayer;