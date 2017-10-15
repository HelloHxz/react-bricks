import React from 'react';
import SvgUri from './react-native-svg-uri/index';
import StyleSheet from '../style';
import View from '../view'
const Theme =require("../theme").default;
import Common from './common'

export default class Icon extends React.Component {

  render() {

    if (!this.props.icon) {
      return null;
    }
    var StyleConfig = Common.getStyle(this.props);
    var fill = {};
    if(!this.props.colorful){
     fill = {fill:StyleConfig.color};
    }
    return (
      <View style={{...{justifyContent:"center",alignItems:"center"},...StyleConfig.wrapperStyle}}>
        <SvgUri
        	style={StyleConfig.iconStyle}
          width={StyleConfig.iconStyle.width}
          height={StyleConfig.iconStyle.width}
          svgXmlData={this.props.icon}
          {...fill}
        />
        </View>
    );
  }
}
