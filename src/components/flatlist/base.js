import React from 'react'
import {
  View,
  ScrollView,
  Animated,
  PanResponder,
  FlatList,
  LayoutAnimation,
  UIManager
} from 'react-native'


export default class Base extends React.Component {
  constructor(props){
    super(props);
    this.horizontal = !!props.horizontal;
    this.scrollValue = 0;
  }
  animation(){
    LayoutAnimation.easeInEaseOut();
  }

  onScroll(e){
    var ne = e.nativeEvent;
    this.scrollValue = this.horizontal?ne.contentOffset.x:ne.contentOffset.y;
  }


  pullMove(e,gestureState){
    var diff = this.horizontal?e.nativeEvent.pageX-this.startPos.pageX:e.nativeEvent.pageY-this.startPos.pageY;
    this.setState({offset:diff/3});
  }


  onTouchStart(e,gestureState){
		this.startPos = {pageX:e.nativeEvent.pageX,pageY:e.nativeEvent.pageY};
  }


  onTouchEnd(e,gestureState){
    this.animation();
    this.setState({offset:0});
    this._onTouchEnd(e,gestureState);
    return true;
  }


  render() {
    return  (
      <View style={{flex:1}}
        {...this._panResponder.panHandlers}>
    	<View style={{height:this.state.offset,backgroundColor:"red"}}/>
			<View style={{height:100,backgroundColor:"red",marginTop:-100}}/>
        {this.renderList()}
      </View>
    );
  }
}


