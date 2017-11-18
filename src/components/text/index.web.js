import React from 'react';
import StyleSheet from '../style'

class Text extends React.Component {

  componentWillReceiveProps(props){

  }

  onPress(e){
    this.props.onPress(e);
  }

  render() {
  	var style = this.props.style||{};
    style = StyleSheet.convertTransform(style);
    var press ={};
    if(this.props.onPress){
      press.onClick = this.onPress.bind(this)
    }
    return (<span style={style} {...press} className='bri-span'>{this.props.children}</span>);
  }
}

export default Text;