import {TextInput} from 'react-native'

import React from 'react';

import StyleSheet from '../style'

import DefaultStyle from './css'

import View from '../view'

import TouchableWithoutFeedback from '../touchableopacity'


export default class TextInputCom extends React.Component{

	onChangeText(text){
		this.props.onChange(null,text);
	}

	clear(){
		this.props.onChange(null,"");
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
		return <View style={DefaultStyle.wrapper}>
			<TextInput 
				ref="input"
				value={this.props.value}
				style={DefaultStyle.input} underlineColorAndroid="transparent" keyboardType='numeric' {...onChange} type="text"/>
			<TouchableWithoutFeedback
			 onPress = {this.clear.bind(this)}
			 style={StyleSheet.create({width:80,backgroundColor:"red",height:"100%"})}>

			</TouchableWithoutFeedback>
		</View>
	}
}