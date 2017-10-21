import React from 'react';
import SvgUri from './react-native-svg-uri/index';
import StyleSheet from '../style';
import View from '../view';
import Animated from '../animated'
const Theme =require("../theme").default;
import Common from './common'

export default class Icon extends React.Component {

  render() {

    if (!this.props.icon) {
      return null;
    }
    var StyleConfig = Common.getStyle(this.props,{
      rotate:this.props.rotate
    });
    var fill = {};
    if(!this.props.colorful){
     fill = {fill:StyleConfig.color};
    }
    var Wrapper = View;
    if(this.props.rotate||this.props.rotate===0){
      Wrapper = Animated.View;
    }
    return (
      <Wrapper style={{...{justifyContent:"center",alignItems:"center"},...StyleConfig.wrapperStyle}}>
        <SvgUri
        	style={StyleConfig.iconStyle}
          width={StyleConfig.iconStyle.width}
          height={StyleConfig.iconStyle.width}
          svgXmlData={this.props.icon}
          {...fill}
        />
        </Wrapper>
    );
  }
}
