import Animated from 'animated'
import View from '../view'
import Text from '../text'
import React from 'react';

class AnimatedView extends React.Component {
	//配合animate 处理单位
  render() {
    return (<View ref={(node)=>{this.node = node;}} {...this.props} xzIsAnimate={true}></View>);
  }
}


//在View 配合animate 处理单位
export default {
  ...Animated,
  View: Animated.createAnimatedComponent(AnimatedView),
  Text: Animated.createAnimatedComponent(Text)
};