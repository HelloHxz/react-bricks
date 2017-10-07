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

  componentWillReceiveProps(props) {
      if(this.props.isRefreshing !== props.isRefreshing) {
        if(!props.isRefreshing) {
        	this.setState({
        		offset:0
        	});
        }
    }
  }
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  _handleShouldSetPanResponder(e, gestureState) {
    return !this.state.isScrollFree;
  }

  onTouchMove(e, gestureState) {
      if((gestureState.dy >= 0 && this.scrollValue <= 0) ) {
	        this.pullMove(e,gestureState);
      } else {
        	if(this.state.isScrollFree){
        	}else{
      		  this.flatlist.scrollToOffset({offset: -1*gestureState.dy, animated: true});
        	}
      }
  }

 


  _onTouchEnd(e, gestureState) {
      if(this.scrollValue > 0) {
        this.setState({isScrollFree: true});
      }
  }

  isScrolledToTop() {
    if(this.scrollValue <= 0 && this.state.isScrollFree) {
      this.setState({isScrollFree: false});
    }
  }

  renderList() {
    return  (
        <FlatList 
          ref={(flatlist)=>{this.flatlist = flatlist;}}
          {...this.props}
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


