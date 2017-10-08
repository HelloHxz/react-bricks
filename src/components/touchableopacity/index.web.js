import React from 'react';
import './index.less'
import View from '../view'

class TouchableOpacity extends React.Component {

  onClick(e){
  	if(this.props.onPress){
  		this.props.onPress(e);
  	}
  }	
  render() {
  	var style = this.props.style||{};
  	style.display = "flex";
    return (<View className='xz-top-7' onPress={this.onClick.bind(this)} style={style}>{this.props.children}</View>);
  }
}

export default TouchableOpacity;