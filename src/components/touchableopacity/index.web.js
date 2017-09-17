import React from 'react';

class TouchableOpacity extends React.Component {

  onClick(){
  	if(this.props.onPress){
  		this.props.onPress();
  	}
  }	
  render() {
  	var style = this.props.style||{};
  	style.display = "flex";
    return (<div onClick={this.onClick.bind(this)} style={style}>{this.props.children}</div>);
  }
}

export default TouchableOpacity;