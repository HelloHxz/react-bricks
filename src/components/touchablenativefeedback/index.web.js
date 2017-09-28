import React from 'react';

class TouchableNativeFeedBack extends React.Component {

  onClick(e){
  	if(this.props.onPress){
  		this.props.onPress(e);
  	}
  }	
  render() {
  	var style = this.props.style||{};
  	style.display = "flex";
    return (<div onClick={this.onClick.bind(this)} style={style}>{this.props.children}</div>);
  }
}

export default TouchableNativeFeedBack;