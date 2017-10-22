import React from 'react';

export default class TextInput extends React.Component{

	render(){
		return <input {...this.props} type="text"/>
	}
}