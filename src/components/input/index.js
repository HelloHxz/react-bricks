import React from 'react';

import TextInput from './TextInput'

import StyleSheet from '../style'

import DefaultStyle from './css'

import View from '../view'

import Icon from '../icon'

import TouchableWithoutFeedback from '../touchableopacity'


export default class InputCom extends React.Component{

	constructor(props){
		super(props);
		this.webTarget = null;
		this.state = {
			showClearButton:false
		}
	}

	onChangeText(params){
		var text = params;
		if(StyleSheet.isWeb){
			text = params.target.value;
			this.webTarget = params;
		}
		this._textChange(text,params);
		
	}

	_textChange(text,e){
		text = text||"";
		if(text.length>0){
			if(!this.state.showClearButton){
				this.setState({showClearButton:true});
			}
		}else{
			if(this.state.showClearButton){
				this.setState({showClearButton:false});
			}
		}
		this.props.onChange(e,text);
	}

	clear(){
		if(StyleSheet.isWeb){
			this.refs.input.focus();
		}
		this._textChange("",this.webTarget);
	}
	render(){
		var onChange = {
		}
		
		var changeEventName = "onChange";
		var NativeProps = {};
		if(!StyleSheet.isWeb){
			changeEventName="onChangeText";
			NativeProps = {underlineColorAndroid:"transparent",keyboardType:'numeric' }
		}
		if(this.props.onChange){
			onChange[changeEventName]=this.onChangeText.bind(this)
		}

		var clearWrapperStyle = {...DefaultStyle.clearWrapper,
			...{backgroundColor:DefaultStyle.wrapper.backgroundColor||"transparent"}
		}
		var clearWrapper = null;
		if(this.state.showClearButton){
			clearWrapper = <TouchableWithoutFeedback 
				onPress = {this.clear.bind(this)}
				style={clearWrapperStyle}>
					<Icon style={{color:"#bbb"}} icon='round_close_fill'/>
				</TouchableWithoutFeedback>
		}


		return <View style={DefaultStyle.wrapper}>
			<TextInput 
				ref="input"
				placeholder={this.props.placeholder||""}
				value={this.props.value}
				{...NativeProps}
				style={DefaultStyle.input}  {...onChange} type="text"/>
				{clearWrapper}
		</View>
	}
}