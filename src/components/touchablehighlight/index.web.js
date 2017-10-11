import React from 'react';

import View from '../view';
import "./index.less"

class TouchableHighlight extends React.Component {

  onClick(e){
  	if(this.props.onPress){
  		this.props.onPress(e);
  	}
  }	
  render() {
  	var style = this.props.style||{};
  	style.display = "flex";
    return (<View className='xz-default-hl' onPress={this.onClick.bind(this)} style={style}>{this.props.children}</View>);
  }
}

export default TouchableHighlight;