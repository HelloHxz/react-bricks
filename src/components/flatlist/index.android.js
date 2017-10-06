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


class AnimatedPTR extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshHeight:0,
      currentY : 0,
      offset:0,
      isScrollFree: false
    }
    this.scrollY = 0;
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  static defaultProps = {
    minPullDistance : 120,
    PTRbackgroundColor: 'white',
    contentBackgroundColor: 'white'
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
		onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
		onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
		onPanResponderMove: this._handlePanResponderMove.bind(this),
		onPanResponderGrant: this.onTouchStart.bind(this),
		onPanResponderRelease: this._handlePanResponderEnd.bind(this),
		onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
    });
  }

  onScrollRelease() {

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


  _handlePanResponderMove(e, gestureState) {
      if((gestureState.dy >= 0 && this.scrollY <= 0) ) {
        var diff = this.horizontal?e.nativeEvent.pageX-this.startPos.pageX:e.nativeEvent.pageY-this.startPos.pageY;
		this.setState({refreshHeight:diff/3});
      } else {
        	if(this.state.isScrollFree){

        	}else{
      		  this.flatlist.scrollToOffset({offset: -1*gestureState.dy, animated: true});
        	}
      }
  }

   animation(){
    LayoutAnimation.easeInEaseOut();
  }


  _handlePanResponderEnd(e, gestureState) {
  	  this.animation();
  	  this.setState({
        	refreshHeight:0
        });
      if(this.scrollY > 0) {
        this.setState({isScrollFree: true});

        // if(this.isAutoGo&&this.state.scrollY>10&&gestureState.dy<0){
        // 	this.isAutoGo = false;
        // 	setTimeout(()=>{
        // 		this.refs.PTR_ScrollComponent.scrollToOffset({offset: this.state.scrollY+300, animated: true});
        // 	},1);
        // }
      }else{
      	 // this.refs.PTR_ScrollComponent.scrollToOffset({offset: 0, animated: true});
      }
  }

  isScrolledToTop() {
    if(this.scrollY <= 0 && this.state.isScrollFree) {
      this.setState({isScrollFree: false});
    }else{

    }
  }

  onScroll(event){
  	this.scrollY =event.nativeEvent.contentOffset.y ;
  }

  render() {
    return  (
      <View style={{flex:1, backgroundColor:this.props.contentBackgroundColor}}
        {...this._panResponder.panHandlers}>
    	<View style={{height:this.state.refreshHeight,backgroundColor:"red"}}/>
			<View style={{height:100,backgroundColor:"red",marginTop:-100}}/>
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
      </View>
    );
  }
}


module.exports = AnimatedPTR;