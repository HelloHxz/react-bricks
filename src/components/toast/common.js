import React from 'react';
import View from '../view';
import StyleSheet from '../style';
import Easing from '../easing';
import Animated from '../animated';

let Styles = StyleSheet.create({
	wrapper:{
		width:"100%",
		height:0,
		left:-1,
		top:-1,
		zIndex:10000,
		position:"absolute"
	}
});

var zIndex = 10000;
var seedkey = 1;
var directionArr = ["top","bottom","center"];
var aimationArr = ["slide","fade"];

class Toast extends React.Component{

	constructor(props) {
		super(props);
		this.Dict = {};
		this.instanceDict = {};
	}

	show(config){
		seedkey+=1;
		var key = "toast_"+seedkey;
		this.Dict[key] = <ToastItem ref={(instance)=>{
		  this.instanceDict[key] = instance;
		}} pkey={key} parent={this} config={config} key={key}/>
		this.setState({seed:1});
		return key;
	}

	hide(key){
		var instance = this.instanceDict[key];
		if(instance){
		  instance.hide();
		}
	}

	renderChild(){
		var children = [];
	    for(var key in this.Dict){
	      children.push(this.Dict[key]);
	    }
	    return children;
	}

	render(){
		return (<View style={Styles.wrapper}>
			{this.renderChild()}
			</View>)
	}
}

class ToastItem extends React.Component{

	constructor(props){
		super(props);
	}

	render(){
		return (
				<View style={StyleSheet.create({position:"absolute",
					width:200,height:100,top:200,transform:[{translate:["-50%",0,0]}],
					left:'50%',backgroundColor:"#000",opacity:.8,borderRadius:30})}/>
			)
	}
}

export default Toast;