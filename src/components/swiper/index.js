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
		this.horizontal = this.direction==="horizontal";
		this.ScrollPosition = null;
	}

	onMomentumScrollEnd(e){
		// if(this.ScrollPosition.x ===0){
			// this.scroll.scrollTo({x:StyleSheet.screen.originWidth,y:0,animated:false});
		// }
	}

	onScroll(e){
		this.ScrollPosition = e.nativeEvent.contentOffset;
	}

	render(){
		var style = this.props.style||{};
		return (<View style={style}>
			<ScrollView
			 ref={(scroll)=>{
			 	this.scroll = scroll;
			 }}
			 scrollEventThrottle={20}
			 onScroll={this.onScroll.bind(this)}
			 onMomentumScrollEnd = {this.onMomentumScrollEnd.bind(this)}
			 showsHorizontalScrollIndicator={false} pagingEnabled={true} horizontal={this.horizontal}>
				<View style={{width:StyleSheet.screen.originWidth}}><Text>1</Text></View>
				<View style={{width:StyleSheet.screen.originWidth}}><Text>2</Text></View>
				<View style={{width:StyleSheet.screen.originWidth}}><Text>3</Text></View>
				<View style={{width:StyleSheet.screen.originWidth}}><Text>4</Text></View>
			</ScrollView>
		</View>)
	
	}
}

export default Swiper;