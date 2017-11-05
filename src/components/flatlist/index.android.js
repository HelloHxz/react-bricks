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
import Base from './base'


export default class AndroidFlatList extends Base {
  constructor(props) {
    super(props);
    this.state = {
      offset:0,
      refreshState:props.refreshState||"done",// or done loading
      isScrollFree: false
    }
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
		onStartShouldSetPanResponder: this._handleShouldSetPanResponder.bind(this),
		onMoveShouldSetPanResponder: this._handleShouldSetPanResponder.bind(this),
		onPanResponderMove: this.onTouchMove.bind(this),
		onPanResponderGrant: this.onTouchStart.bind(this),
		onPanResponderRelease: this.onTouchEnd.bind(this),
    });
  }

  onScrollRelease() {

  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  _handleShouldSetPanResponder(e, gestureState) {
    this.autoScroll = false;
    this.startTime = new Date().valueOf();
    return !this.state.isScrollFree;
  }

  onTouchMove(e, gestureState) {
      this.autoScroll = false;
      if((gestureState.dy >= 0 && this.scrollValue <= 0) ) {
	        this.pullMove(e,gestureState);
      } else {
        	if(this.state.isScrollFree){
        	}else{
            this.autoScroll = true;
      		  this.flatlist.scrollToOffset({offset: -1*gestureState.dy, animated: false});
        	}
      }
  }

 
  _onTouchEnd(e, gestureState) {
      if(this.scrollValue > 0) {
        this.setState({isScrollFree: true},()=>{
          
        });
        if(new Date().valueOf()-this.startTime<400){
          if(this.autoScroll){
              this.flatlist.scrollToOffset({offset:500, animated: true});
          }
        }
        
      }
  }

  isScrolledToTop() {
    if(this.scrollValue <= 0 && this.state.isScrollFree) {
      this.setState({isScrollFree: false});
    }
  }

  renderList(offset) {
    return  (
        <FlatList 
          ref={(flatlist)=>{this.flatlist = flatlist;}}
          {...this.props}
          ListHeaderComponent={this.getHeader(offset)}
          scrollEnabled={this.state.isScrollFree}
          onScroll={this.onScroll.bind(this)}
          onTouchEnd= {() => {this.isScrolledToTop()}}
          onScrollEndDrag= {() => {this.isScrolledToTop()}}
          onMomentumScrollEnd = {() => {this.isScrolledToTop()}}
          onResponderRelease ={() => {this.onScrollRelease.bind(this)}}
        >
        </FlatList>
    );
  }
}


