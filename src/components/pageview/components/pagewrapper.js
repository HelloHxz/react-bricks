import React from 'react';
import View from '../../view';
import Text from '../../text';
import Easing from '../../easing';
import Animated from '../../animated';
import Theme from '../../theme'
import StyleSheet from '../../style'
import TouchableWithoutFeedback from '../../touchablewithoutfeedback';

var AlertStyles = StyleSheet.create({
	wrapper:{
		position:"absolute",
		backgroundColor:"transparent",
		overflow:"hidden",
		zIndex:1000
	},
	wrapper_hide:{
		left:-1000,
		width:0,
		height:0
	},
	wrapper_show:{
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
		opacity:(Theme.alert_bk_opacity||Theme.alert_bk_opacity===0)?Theme.alert_bk_opacity:0.3,
		zIndex:1,
	},
	layer:{
		width:"100%",
		height:0,
		backgroundColor:"#fff",
		zIndex:2,
		position:"absolute",
		top:0
	},
	contentWrapper:{position:"absolute",display:"flex",width:"100%",height:"100%",zIndex:10,backgroundColor:"#fff"}
});
export default class AlertItem extends React.Component{

	constructor(props){
		super(props);
		this.config = props.config||{};
		this.animate = !!props.config.animate;
		this.state = {
			willHide:false,
			openValue: new Animated.Value(0),
		}
	}

	hide(key){
		if(this.animate){
			Animated.timing(
				this.state.openValue,
				{
				  toValue: 0,
				  easing:Easing.in(),
				  duration:140,
				}
			  ).start(
				  ()=>{
					this._hide(key);
				  }
			  )
		}else{
			this._hide(key);
		}
		
	}

	_hide(key){
		this.setState({
			willHide:true
		})
		delete this.props.parent.Dict[key];
		delete this.props.parent.instanceDict[key];
	}

	componentDidMount(){
		if(this.animate){
			Animated.timing(
				this.state.openValue,
				{
				  toValue: 1,
				  easing:Easing.in(),
				  duration:150,
				}
			  ).start(
				  
			  )
		}
	}

	render(){
		var children = [];
		if(this.state.willHide){
			return null;
		}
		var animateStyle = {};
		if(this.animate){
			var drawerTranslateY = this.state.openValue.interpolate({
				inputRange: [0, 1],
				outputRange:[StyleSheet._px(StyleSheet.baseScreen.height),0],
				extrapolate: 'clamp',
			});
			animateStyle={transform:[{"translateY":drawerTranslateY}]};
		}else{
			
		}
		

		return <View style={StyleSheet.create({position:"absolute",flexDirection:"row",top:0,left:0,zIndex:11111,width:StyleSheet.baseScreen.width,height:"100%"})}>
			<Animated.View 
			key='content' 
			style={{...AlertStyles.contentWrapper,...animateStyle}}
			>
			{this.props.children}
			</Animated.View>
		</View>;
	}
}