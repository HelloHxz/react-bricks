import {FlatList} from 'react-native';
import React from 'react'
import StyleSheet from '../style'
import { View,PanResponder,UIManager,LayoutAnimation,ScrollView } from 'react-native'
/*
https://github.com/shiwenwen/react-native-swRefresh
https://github.com/react-native-component/react-native-smart-pull-to-refresh-listview
https://github.com/greatbsky/react-native-pull
*/

const isVerticalGesture = (x, y) => {
    return (Math.abs(x) < Math.abs(y));
};

const isPullDirection = (x, y) => {
   	 return y >0;
    // return y > 0 && (y > Math.abs(x));
};
const isUpGesture = (x, y) => {
    return y < 0 && (Math.abs(x) < Math.abs(y));
};

export default class FL extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			offset:0
		};

		this.horizontal = false;
		this.scrollValue = 0;
		this.startPos = {dx:0,dy:0};
		this.isDown = false;
		this.dy = 0;
		this.s = true;
	
		this._panResponder = PanResponder.create({

	      onStartShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
	      onMoveShouldSetPanResponder: this.onShouldSetPanResponder.bind(this),
	      // onStartShouldSetResponderCapture:this.onShouldSetPanResponder.bind(this),
	      // onMoveShouldSetResponderCapture: this.onShouldSetPanResponder.bind(this),
	      onPanResponderTerminationRequest: (event, gestureState) => true,
	      onPanResponderGrant: this.onTouchStart.bind(this),
	      onPanResponderMove: this.onTouchMove.bind(this),
	      onPanResponderRelease: this.onTouchEnd.bind(this)
	    })
	}
	/*
		flat的自带滚动，能滚 则不能得到move

		flat不能滚 则可以得到move
		
		onStartShouldSetPanResponderCapture 设置为true的时候
		表示接受触摸相应 则不会响应具体的点击事件
	
		onStartShouldSetPanResponderCapture false onMoveShouldSetPanResponderCapture true 不能滚动 但可以响应点击


		onStartShouldSetPanResponderCapture onMoveShouldSetPanResponderCapture
		都设成false 才能滚

		onStartShouldSetPanResponder onMoveShouldSetPanResponder 
		false 能滚 true 不能滚



	*/

	onScroll(e){

		var ne = e.nativeEvent;
		this.scrollValue = this.horizontal?ne.contentOffset.x:ne.contentOffset.y;
	}

	onStartShouldSetPanResponderCapture(e,gestureState){
		return true;

	}

	onMoveShouldSetPanResponderCapture(e,gestureState){
		return true;
	}

	onShouldSetPanResponder(e,gestureState){
			if(isPullDirection(gestureState.dx,gestureState.dy)&&this.scrollValue<=150){
		    	if(this.scrollValue>0&&this.flatlist){
		    		this.flatlist.scrollToIndex({
		    			animated:false,
		    			index:0
		    		})
		    	}
		    	//向下 在顶端端
		    	return true;
		    }
	      	return false;
	}

	onTouchStart(e,gestureState){
		this.startPos = {pageX:e.nativeEvent.pageX,pageY:e.nativeEvent.pageY};
	}

	onTouchMove(e,gestureState){
		if(gestureState.dy >= 0&&this.scrollValue<=10){
			var diff = this.horizontal?e.nativeEvent.pageX-this.startPos.pageX:e.nativeEvent.pageY-this.startPos.pageY;
			this.setState({offset:diff/3});
		}
		return true;
	}

	onTouchEnd(){
		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
	    LayoutAnimation.easeInEaseOut();
		this.setState({offset:0});
		return true;
	}

	render(){

		return <View 
			{...this._panResponder.panHandlers}
			style={{flex:1,overflow:"hidden",backgroundColor:"#fff"}}>
				<View style={{height:this.state.offset,backgroundColor:"red"}}/>
				<View style={{height:100,backgroundColor:"red",marginTop:-100}}/>
				<FlatList 
				 ref={(flatlist)=>{this.flatlist = flatlist;}}
				 onScroll = {this.onScroll.bind(this)}
				 {...this.props}/>
		</View>
	}
}

