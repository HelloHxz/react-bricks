import React from 'react';
import View from '../view';
import Text from '../text';
import Easing from '../easing';
import Animated from '../animated';
import StyleSheet from '../style';
import ToastItem from './components/Toast'
import AlertItem from './components/Alert'

let seedkey = 0;

export default class PopRoot extends React.Component{
	constructor(props){
		super(props);
		this.instanceDict = {};
		this.Dict = {};
		this.state={
			seedkey:0
		}
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

	Alert(config){
		seedkey+=1;
		var key = "alert_"+seedkey;
		this.Dict[key] = <AlertItem ref={(instance)=>{
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
		return ( 
				<View style={{position:"absolute",height:"100%",width:0,top:0}}>
					 	 {this.renderChild()}
				</View>);
	}
}