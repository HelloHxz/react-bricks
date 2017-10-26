import {TextInput} from 'react-native'

import React from 'react';

import StyleSheet from '../style'

import DefaultStyle from './css'


export default class TextInputCom extends React.Component{

	onChangeText(text){
		this.props.onChange(null,text);
	}
	render(){
		var onChange = {
		}
		if(this.props.onChange){
			onChange = {
				onChange :null,
				onChangeText:this.onChangeText.bind(this)
			}
		}
		var props = this.props;
		return <TextInput style={DefaultStyle.wrapper} underlineColorAndroid="transparent" keyboardType='numeric'  {...props} {...onChange} type="text"/>
	}
}