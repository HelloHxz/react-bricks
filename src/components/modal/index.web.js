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
	},
	wrapper:{
		position:"fixed",
		zIndex:11111,
		top:0,
		visibility: "hidden",
		left:0,
		right:0,
		bottom:0
	}
}
export default class Modal extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			visible:false
		};
	}

	componentWillReceiveProps(nextProps){
		if(this.state.visible!==nextProps.visible){
			this.setState({
				visible:nextProps.visible
			});
		}
	}


	onShow(){
		if(this.props.onShow){
			this.props.onShow();
		}
	}

	render(){
		if(this.state.visible){
			Styles.wrapper.visibility = "visible";
			setTimeout(()=>{
				this.onShow();
			},30)
		}else{
			Styles.wrapper.visibility = "hidden";
		}
		return <Animated.View style={Styles.wrapper}>
			{this.props.children}
		</Animated.View>
	}
}