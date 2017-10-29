import React from 'react';
import {DatePickerIOS} from 'react-native'

export default class DatePicker extends React.Component{

	render(){
		return <DatePickerIOS {...this.props}></DatePickerIOS>
	}
}