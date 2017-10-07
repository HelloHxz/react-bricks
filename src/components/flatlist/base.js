import React from 'react'
import {
  View,
  ScrollView,
  Animated,
  PanResponder,
  FlatList,
  LayoutAnimation,
  UIManager
} from 'react-native';
import StyleSheet from '../style'
import Theme from '../theme'


export default class Base extends React.Component {
  constructor(props){
    super(props);
    this.horizontal = !!props.horizontal;
    this.scrollValue = 0;
    if(isNaN(this.props.pullHeight)){
      this.pullHeight = StyleSheet.px2px(Theme.flatlist_pullheight);
    }else{
      this.pullHeight = this.props.pullHeight;
    }
  }

  animation(){
    LayoutAnimation.easeInEaseOut();
  }

  onScroll(e){
    var ne = e.nativeEvent;
    this.scrollValue = this.horizontal?ne.contentOffset.x:ne.contentOffset.y;
  }


  pullMove(e,gestureState){
    this.diff = (this.horizontal?e.nativeEvent.pageX-this.startPos.pageX:e.nativeEvent.pageY-this.startPos.pageY)/3;
    this.setState({offset:this.diff});
  }


  onTouchStart(e,gestureState){
		this.startPos = {pageX:e.nativeEvent.pageX,pageY:e.nativeEvent.pageY};
  }


  onTouchEnd(e,gestureState){
    this.animation();
    if(this.diff>=this.pullHeight){
      this.setState({offset:this.pullHeight});
      setTimeout(()=>{
        this.animation();
        this.setState({offset:0});
      },2000)
    }else{
      this.setState({offset:0});
    }
    this._onTouchEnd(e,gestureState);

    return true;
  }


  render() {
    return  (
      <View style={{flex:1}}
        {...this._panResponder.panHandlers}>
    	<View style={{height:this.state.offset}}/>
			<View style={{height:this.pullHeight,backgroundColor:"#eee",marginTop:-this.pullHeight}}/>
        {this.renderList()}
      </View>
    );
  }
}


