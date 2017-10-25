import React from 'react';

export default class TextInput extends React.Component{
	onChange(e){
		this.props.onChange(e,e.target.value);
	}
	render(){
		var props = this.props;
		var onChange ={onChange:this.onChange.bind(this)} 
		return <input {...props} {...onChange} type="text"/>
	}
}