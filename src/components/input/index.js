import {TextInput} from 'react-native'

import React from 'react';

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
		return <TextInput {...props} {...onChange} type="text"/>
	}
}