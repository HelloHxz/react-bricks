import React from 'react';
import View from '../view'

class TouchableOpacity extends React.Component {

  onClick(e){
  	if(this.props.onPress){
  		this.props.onPress(e);
  	}
  }	
  render() {
  	var style = this.props.style||{};
    return (<View onPress={this.onClick.bind(this)} style={style}>{this.props.children}</View>);
  }
}

export default TouchableOpacity;