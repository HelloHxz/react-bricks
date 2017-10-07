/* eslint-disable eol-last */
import React from 'react';
import './index.less';
import StyleSheet from '../style'
const Theme =require("../theme").default;

class Com extends React.Component{

	getStyle(props){
		var style =Object.assign({}, props.style||{});
		style = StyleSheet.convertTransform(style);
		var Re = {
			width:StyleSheet.px(Theme.icon_default.width),
			color:Theme.icon_color,
			style:{}
		};
		if(style.width){
		}else{
			var size = props.size||"default";
			if(["lg","sm"].indexOf(size)<0){
				size = "default";
			}
			style.width = StyleSheet.px(Theme["icon_"+size].width);
		}
		if(style.color){
			style.fill = style.color;
		}else{
			style.fill = Theme.icon_color;
		}
		var arr = [];
		style.height = style.width;
		for(var key in style){
			arr.push(key+":"+style[key]);
		}
		return {
			str:arr.join(";"),
			fill:style.fill
		};

	}
	createMarkup(_this) {
		var icon = _this.props.icon||"";
		var re =_this.getStyle(_this.props);
		icon = icon.replace("<svg","<svg style='"+re.str+"'");
		icon = icon.replace(/\sfill="#ef473a"/g,' fill="'+re.fill+'"')
		return {__html: icon};
	}
	render(){
		return <span className='xz-icon' dangerouslySetInnerHTML={this.createMarkup(this)}></span>
	}
}
export default Com;