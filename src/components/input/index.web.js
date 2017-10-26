import React from 'react';


import StyleSheet from '../style'

import DefaultStyle from './css'

export default class TextInput extends React.Component{
	onChange(e){
		this.props.onChange(e,e.target.value);
	}
	render(){
		var props = this.props;
		var onChange ={onChange:this.onChange.bind(this)} 
		return <input {...props} {...onChange} style={DefaultStyle.wrapper} type="text"/>
	}
}