import React from 'react';
import View from '../view';
import Text from '../text';
import Easing from '../easing';
import Animated from '../animated';
import StyleSheet from '../style';
import PageWrapper from './components/pagewrapper'




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

	show(children,params){
		seedkey+=1;
		var key = "poppage_"+seedkey;
		this.Dict[key] = <PageWrapper 
			pagekey={seedkey+"p"}
			params={params}
			ref={(instance)=>{
			  this.instanceDict[key] = instance;
			}} pkey={key} parent={this} key={key}>{children}</PageWrapper>
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