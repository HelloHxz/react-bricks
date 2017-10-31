import {Modal} from 'react-native';
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
export default class RNModal extends React.Component{
	onRequestClose(){}
	constructor(props){
		super(props);
		this.state = {
			visible:props.visible
		}
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
		return <Modal 
			onShow={this.onShow.bind(this)}
			visible={this.state.visible} onRequestClose={this.onRequestClose.bind(this)} transparent={true} style={{position:"fixed",zIndex:11111,top:0,left:0,right:0,bottom:0}}>
			{this.props.children}
		</Modal>
	}
}