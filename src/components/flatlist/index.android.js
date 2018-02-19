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

import StyleSheet from '../style';
import Theme from '../theme';

import Header from './AndroidHeader'


export default class AndroidFlatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset:0,
      refreshState:props.refreshState||"done",// or done loading
    }
    this.isScrollFree=false;
    
    this.horizontal = !!props.horizontal;
    this.scrollValue = 0;
    if(isNaN(this.props.pullHeight)){
      this.pullHeight = StyleSheet.px2px(Theme.flatlist_pullheight);
    }else{
      this.pullHeight = this.props.pullHeight;
    }
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
		onStartShouldSetPanResponder: this._handleShouldSetPanResponder.bind(this),
		onMoveShouldSetPanResponder: this._handleShouldSetPanResponder.bind(this),
		onPanResponderMove: this.onTouchMove.bind(this),
		onPanResponderGrant: this.onTouchStart.bind(this),
		// onPanResponderRelease: this.onTouchEnd.bind(this),
    });
  }


  componentDidMount() {
  }

  componentWillUnmount() {
  }

  
  onTouchStart(e,gestureState){
    this.isInLoading = false;
    this.canRefresh = false;
    this.touchAction = "";
    this.diff = 0;
		this.startPos = {pageX:e.nativeEvent.pageX,pageY:e.nativeEvent.pageY};
  }



  _handleShouldSetPanResponder(e, gestureState) {
    this.autoScroll = false;
    this.startTime = new Date().valueOf();
    
    return !this.isScrollFree;
  }

  onTouchMove(e, gestureState) {
      this.autoScroll = false;
      if((gestureState.dy >= 0 && this.scrollValue <= 0) ) {
	        this.pullMove(e,gestureState);
      } else {
        	if(this.isScrollFree){
        	}else{
            this.autoScroll = true;
      		  this.flatlist.scrollToOffset({offset: -1*gestureState.dy, animated: true});
        	}
      }
  }


  pullMove(e,gestureState){
    this.diff = (this.horizontal?e.nativeEvent.pageX-this.startPos.pageX:e.nativeEvent.pageY-this.startPos.pageY)/3;
    if(this.diff>0){
        if(this.scrollValue <=0){
          this.canRefresh = this.diff > this.pullHeight;
          this.touchAction = "refresh";
          this.header.indicatorWrapper.setNativeProps({
            style:{
              marginTop:0-this.pullHeight+this.diff
            }
          })
        }
    }
  }



  onScroll(e){
    var ne = e.nativeEvent;
    this.scrollValue = this.horizontal?ne.contentOffset.x:ne.contentOffset.y;
    this.isScrolledToTop();
  }

 
  _onTouchEnd(e, gestureState) {
      if(this.scrollValue > 0) {
        this.isScrollFree = true;
        this.flatlist.setNativeProps({
          scrollEnabled:true
        });
        if(new Date().valueOf()-this.startTime<300){
          // auto go
        }
        
      }
  }


  onTouchEnd(e,gestureState){
    if(this.canRefresh){
      this.isInLoading = true;
      this.header.setLoading();
      setTimeout(()=>{
        this.refreshEnd();
      },2000)
    }else{
      this.refreshEnd();
    }
    this._onTouchEnd(e,gestureState);
    return true;
  }

  refreshEnd(){
    this.header.reset();
    setTimeout(()=>{
      this.isInLoading = false;
    },80)
    this.props.onRefreshClose&&this.props.onRefreshClose();
  }

  onScrollRelease(){
  }

  isScrolledToTop() {
    if(this.scrollValue <= 0 && this.isScrollFree) {
      this.isScrollFree = false;
      this.flatlist.setNativeProps({
        scrollEnabled:false
      });
    }
  }

	getHeader(){
		return <Header height={this.pullHeight} ref={(c)=>{this.header = c;
		}}/>
	}

  render() {
    return  (
        <FlatList 
          ref={(flatlist)=>{this.flatlist = flatlist;}}
          {...this.props}
          {...this._panResponder.panHandlers}
          ListHeaderComponent={this.getHeader()}
          scrollEnabled={false}
          onScroll={this.onScroll.bind(this)}
          onTouchEnd={this.onTouchEnd.bind(this)}
          onResponderRelease ={() => {this.onScrollRelease.bind(this)}}
        >
        </FlatList>
    );
  }
}


