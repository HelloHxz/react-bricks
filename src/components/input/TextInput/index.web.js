import React from 'react'
export default class Input extends React.Component{
	focus(){
		this.input.focus();
	}
	blur(){
		this.input.blur();
	}
	render(){
		return <input ref={(instance)=>{this.input = instance;}} {...this.props}/>
	}
}