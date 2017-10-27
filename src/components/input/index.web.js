import React from 'react';

import View from '../view'

import StyleSheet from '../style'

import DefaultStyle from './css'

import Icon from '../icon'

import TouchableWithoutFeedback from '../touchableopacity'

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
				placeholder={this.props.placeholder||""}
				 value={this.props.value}
				 {...onChange} style={DefaultStyle.input} type="text"/>
				<TouchableWithoutFeedback 
				onPress = {this.clear.bind(this)}
				style={StyleSheet.create({width:80,justifyContent:"center",backgroundColor:DefaultStyle.wrapper.backgroundColor||"transparent",alignItems:"center",height:"100%"})}>
					<Icon style={{color:"#bbb"}} icon='round_close_fill'/>
				</TouchableWithoutFeedback>
			</View>
	}
}