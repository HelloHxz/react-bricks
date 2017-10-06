import React from 'react'
import {
  View,
  ScrollView,
  Animated,
  PanResponder,
  FlatList,
  UIManager
} from 'react-native'


class AnimatedPTR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldTriggerRefresh: false,
      scrollY : 0,
      refreshHeight:0,
      currentY : 0,
      offset:0,
      isScrollFree: false
    }
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  static defaultProps = {
    minPullDistance : 120,
    PTRbackgroundColor: 'white',
    contentBackgroundColor: 'white'
  }

  componentWillMount() {
    //Android does not allow for negative scroll, so we have to listen to the scroll values ourselves (at least initially)
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
       onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
       onPanResponderMove: this._handlePanResponderMove.bind(this),
        onPanResponderGrant: this.onTouchStart.bind(this),
       onPanResponderRelease: this._handlePanResponderEnd.bind(this),
       onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
    });
  }
  onScrollTrigger(distance) {
    if(distance.value <= -this.props.minPullDistance) {
      if(!this.state.shouldTriggerRefresh) {
        return this.setState({shouldTriggerRefresh: true});
      }
    } else if(this.state.shouldTriggerRefresh) {
      return this.setState({shouldTriggerRefresh: false});
    }
  }

  onScrollRelease() {
    if(!this.props.isRefreshing && this.state.shouldTriggerRefresh) {
      this.props.onRefresh();
    }
  }

  componentWillReceiveProps(props) {
      if(this.props.isRefreshing !== props.isRefreshing) {
        if(!props.isRefreshing) {
        	this.setState({
        		refreshHeight:0
        	});
        }
    }
  }
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  _handleStartShouldSetPanResponder(e, gestureState) {
    return !this.state.isScrollFree;
  }

  _handleMoveShouldSetPanResponder(e, gestureState) {
    return !this.state.isScrollFree;
  }

  	onTouchStart(e,gestureState){
		this.startPos = {pageX:e.nativeEvent.pageX,pageY:e.nativeEvent.pageY};
	}


  //if the content scroll value is at 0, we allow for a pull to refresh, or else let native android scrolling handle scrolling
  _handlePanResponderMove(e, gestureState) {
      if((gestureState.dy >= 0 && this.state.scrollY <= 30) ) {
        // this.setState({
        // 		refreshHeight:gestureState.dy*.5
        // 	});
        var diff = this.horizontal?e.nativeEvent.pageX-this.startPos.pageX:e.nativeEvent.pageY-this.startPos.pageY;
			this.setState({refreshHeight:diff/3});
      } else {
        this.refs.PTR_ScrollComponent.scrollToOffset({offset: -1*gestureState.dy, animated: true});
      }
  }

  _handlePanResponderEnd(e, gestureState) {
  	  this.setState({
        	refreshHeight:0
        });
      if(this.state.scrollY > 0) {
        this.setState({isScrollFree: true});
      }else{
      	 this.refs.PTR_ScrollComponent.scrollToOffset({offset: 3, animated: true});
      }
  }

  isScrolledToTop() {
    if(this.state.scrollY <= 30 && this.state.isScrollFree) {
      this.setState({isScrollFree: false});
    }else{
    	 // this.setState({isScrollFree: true});
    }
  }

  onScroll(event){
  	this.setState({
  		scrollY:event.nativeEvent.contentOffset.y
  	});
  }

  render() {
    return  (
      <View style={{flex:1, backgroundColor:this.props.contentBackgroundColor}}
        {...this._panResponder.panHandlers}>
    	<View style={{height:this.state.refreshHeight,backgroundColor:"red"}}/>
			<View style={{height:100,backgroundColor:"red",marginTop:-100}}/>
        <FlatList ref='PTR_ScrollComponent'
          {...this.props}
          scrollEnabled={this.state.isScrollFree}
          onScroll={this.onScroll.bind(this)}
          onTouchEnd= {() => {this.isScrolledToTop()}}
          onScrollEndDrag= {() => {this.isScrolledToTop()}}
          onMomentumScrollEnd = {() => {this.isScrolledToTop()}}
          onResponderRelease ={() => {this.onScrollRelease.bind(this)}}
        >
        </FlatList>
      </View>
    );
  }
}


module.exports = AnimatedPTR;