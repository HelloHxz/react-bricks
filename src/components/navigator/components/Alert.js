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
	}
});
export default class AlertItem extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			willBeVisible:false
		}
	}

	hide(){

	}

	componentDidMount(){
		setTimeout(()=>{
			this.setState({
				willBeVisible:true,
				willHide:false
			});
		},10)
	}

	bkPress(){
		this.setState({
			willBeVisible:false
		},()=>{
			setTimeout(()=>{
				this.setState({
					willHide:true
				})
				delete this.props.parent.Dict[this.props.pkey];
    			delete this.props.parent.instanceDict[this.props.pkey];
			},300)

		});
	}

	render(){
		if(this.state.willHide){
			return null;
		}
		var children = [];
		if(!this.state.willBeVisible){

		}else{
			children =[
				(
					<TouchableWithoutFeedback key="bk" onPress={this.bkPress.bind(this)} >
		  				<Animated.View style={{...AlertStyles.bkLayer,...{}}}/>
		  			</TouchableWithoutFeedback>
		  		),
				(
					<Animated.View key='content' style={StyleSheet.create({position:"absolute",borderRadius:10,top:"30%",width:450,height:300,zIndex:10,backgroundColor:"#fff"})}></Animated.View>
				)
			];
		}


		return <View style={StyleSheet.create({position:"absolute",flexDirection:"row",top:0,left:0,zIndex:11111,justifyContent:"center",width:StyleSheet.baseScreen.width,height:"100%"})}>
			{children}
		</View>;
	}
}