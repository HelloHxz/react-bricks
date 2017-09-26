import React from 'react';

class Button extends React.Component {

  onClick(e){
  	if(this.props.onPress){
  		this.props.onPress(e);
  	}
  }	
  render() {
  	var style = this.props.style||{};
    return (<div onClick={this.onClick.bind(this)} style={style}>{this.props.title||"按钮"}</div>);
  }
}

export default Button;