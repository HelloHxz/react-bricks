import View from '../view';
import React from 'react';
import Theme from '../theme'
import StyleSheet from '../style';

const Styles = StyleSheet.create(Theme.header);

export default class Header extends React.Component{

	render(){
		var style = {...Styles,...this.props.style||{}};
		if(StyleSheet.OS==="ios"&&!StyleSheet.isWeb){
			return <View>
				<View style={StyleSheet.create({height:24,backgroundColor:style.backgroundColor||"#fff"})}></View>
				<View style={style}>{this.props.children}</View>
			</View>
		}
		return <View className='xz-header' style={style}>{this.props.children}</View>
	}
}