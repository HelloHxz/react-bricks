/* eslint-disable eol-last */
import React from 'react';
import './index.less';
import StyleSheet from '../style'
const Theme =require("../theme").default;
import View from '../view';
import Common from './common'

class Com extends React.Component{
	createMarkup(_this,re) {
		var arr = [];
		for(var key in re.iconStyle){
			arr.push(key+":"+re.iconStyle[key]);
		}

		var icon = _this.props.icon||"";
		icon = icon.replace("<svg","<svg style='"+arr.join(";")+"'");
		if(!this.props.colorful){
			icon = icon.replace(/\sfill="#ef473a"/g,' fill="'+re.color+'"')
		}
		return {__html: icon};
	}
	render(){
		var re = Common.getStyle(this.props);
		return <View style={re.wrapperStyle} className='xz-icon-wrapper'><span className='xz-icon' dangerouslySetInnerHTML={this.createMarkup(this,re)}></span></View>
	}
}
export default Com;