/* eslint-disable eol-last */
import React from 'react';
import './index.less';
import StyleSheet from '../style'

class Com extends React.Component{
	 createMarkup(props) {
	 	var icon = props.icon||"";
	 	icon= icon.replace("<svg","<svg style='width:"+StyleSheet.px(64)+";height:"+StyleSheet.px(64)+"'");
	  return {__html: icon};
	}
  render(){
    return <span className='xz-icon' dangerouslySetInnerHTML={this.createMarkup(this.props)}></span>
  }
}
export default Com;