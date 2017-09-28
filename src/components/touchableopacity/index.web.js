import React from 'react';
import './index.less'

class TouchableOpacity extends React.Component {

  onClick(e){
  	if(this.props.onPress){
  		this.props.onPress(e);
  	}
  }	
  render() {
  	var style = this.props.style||{};
  	style.display = "flex";
    return (<div className='xz-top-2' onClick={this.onClick.bind(this)} style={style}>{this.props.children}</div>);
  }
}

export default TouchableOpacity;