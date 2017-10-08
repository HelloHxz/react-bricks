import React from 'react';
import StyleSheet from '../style';
import View from '../view'

var defaultStyle = StyleSheet.create({
  height:40,
  backgroundColor:"transparent"
});
export default class Space extends React.Component {
	//配合animate 处理单位
  render() {
    return (<View style={defaultStyle}></View>);
  }
}

