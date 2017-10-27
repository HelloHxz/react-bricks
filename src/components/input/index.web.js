import React from 'react';

import View from '../view'

import StyleSheet from '../style'

import DefaultStyle from './css'

export default class TextInput extends React.Component{
	onChange(e){
		this.props.onChange(e,e.target.value);
	}

	clear(){
		this.props.onChange(null,"");
		this.refs.input.focus();
	}
	render(){
		var props = this.props;
		var onChange ={onChange:this.onChange.bind(this)} 
		return <View style={DefaultStyle.wrapper}>
				<input 
				ref="input"
				 value={this.props.value}
				 {...onChange} style={DefaultStyle.input} type="text"/>
				<View 
				onPress = {this.clear.bind(this)}
				style={StyleSheet.create({width:80,backgroundColor:"red",height:"100%"})}/>
			</View>
	}
}