import {Picker} from 'react-native'
import React from 'react';


export default class P extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			selectedValue:"java"
		}
	}
	render(){
		return (
			<Picker
			  selectedValue={this.state.selectedValue}
			  onValueChange={(lang) => this.setState({selectedValue: lang})}
			  >
			  <Picker.Item label="Java" value="java" />
			  <Picker.Item label="JavaScript" value="js" />
			</Picker>)
	}
}

