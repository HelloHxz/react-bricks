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
    var className = "";
    if(this.props.activeOpacity!==1){
      className = "xz-top-"+this.props.activeOpacity*10;
    }
  	style.display = "flex";
    return (<View className={className} onPress={this.onClick.bind(this)} style={style}>{this.props.children}</View>);
  }
}

export default TouchableOpacity;