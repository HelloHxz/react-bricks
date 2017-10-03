import View from '../view';
import Text from '../text';
import React from 'react';
import { ScrollView } from 'react-native'
import StyleSheet from '../style';

class Swiper extends React.Component{

	constructor(props){
		super(props);
		this.direction = props.direction||"horizontal";
		if(["horizontal","vertical"].indexOf(this.direction)<0){
			this.direction = "horizontal";
		}
	}

	render(){
		var style = this.props.style||{};
		return (<View style={style}>
			<ScrollView pagingEnabled={true} horizontal={this.direction==="horizontal"}>
				<View style={{width:StyleSheet.screen.originWidth}}><Text>1</Text></View>
				<View style={{width:StyleSheet.screen.originWidth}}><Text>2</Text></View>
				<View style={{width:StyleSheet.screen.originWidth}}><Text>3</Text></View>
				<View style={{width:StyleSheet.screen.originWidth}}><Text>4</Text></View>
			</ScrollView>
		</View>)
	
	}
}

export default Swiper;