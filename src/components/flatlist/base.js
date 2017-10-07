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
import ActivityIndicator from '../activityindicator'
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




  onTouchStart(e,gestureState){
    this.isInLoading = false;
    this.canRefresh = false;
    this.touchAction = "";
    this.diff = 0;
		this.startPos = {pageX:e.nativeEvent.pageX,pageY:e.nativeEvent.pageY};
  }


  pullMove(e,gestureState){
    this.diff = (this.horizontal?e.nativeEvent.pageX-this.startPos.pageX:e.nativeEvent.pageY-this.startPos.pageY)/3;
   

    if(this.diff>0){
        if(this.scrollValue <=0){
          this.canRefresh = this.diff > this.pullHeight;
          this.touchAction = "refresh";
          this.setState({offset:this.diff});
        }
    }
  }



  onTouchEnd(e,gestureState){
    if(this.canRefresh){
      this.isInLoading = true;
      this.animation();
      this.setState({offset:this.pullHeight,refreshState:"loading"});
      setTimeout(()=>{
        this.refreshEnd();
      },2000)
    }else{
      this.refreshEnd();
    }
    this.diff = 0;
    this._onTouchEnd(e,gestureState);
    return true;
  }

  refreshEnd(){
    this.animation();
    this.setState({offset:0,refreshState:"done"});
    setTimeout(()=>{
      this.isInLoading = false;
    },80)
    this.props.onRefreshClose&&this.props.onRefreshClose();
  }

  componentWillReceiveProps(nextPros){
    if(nextPros.refreshState==="loading"){
        this.isInLoading = true;
    }
    this.setState({
      refreshState:nextPros.refreshState
    });
  }


  renderPullIndicator(){
    var child = null;
    if(this.props.renderPullIndicator){
      return  this.props.renderPullIndicator({
          offset:this.state.offset,
          pullHeight:this.pullHeight,
          canRefresh:this.canRefresh,
          isInLoading:this.isInLoading
      });
    }else{
      child = <ActivityIndicator/>;

    }
    return <View style={{height:"100%",width:"100%",overflow:"hidden",justifyContent:"center",alignItems:"center"}}>
      {child}
    </View>
  }


  render() {
    var offset = this.state.offset;
    if(this.state.refreshState==='loading'){
          offset = this.pullHeight;
    }
    return  (
      <View style={{flex:1,overflow:"hidden",backgroundColor:"#fff"}}
        {...this._panResponder.panHandlers}>
    	<View style={{height:offset,backgroundColor:this.props.style.backgroundColor||"#fff"}}/>
			<View style={{height:this.pullHeight,marginTop:-this.pullHeight,overflow:"hidden"}}>
        {this.renderPullIndicator()}
      </View>
        {this.renderList()}
      </View>
    );
  }
}


