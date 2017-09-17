import Animated from 'animated'
import View from '../view'
import Text from '../text'

//在View 配合animate 处理单位
export default {
  ...Animated,
  View: Animated.createAnimatedComponent(View),
  Text: Animated.createAnimatedComponent(Text)
};