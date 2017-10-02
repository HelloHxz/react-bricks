import React from 'react';
import StyleSheet from '../style'

class Text extends React.Component {

  componentWillReceiveProps(props){

  }

  render() {
  	var style = this.props.style||{};
  	style = StyleSheet.convertTransform(style);
  	if(this.props.selected){
  		style.color = "red";
  	}
    return (<span style={style} className='bri-span'>{this.props.children}</span>);
  }
}

export default Text;