import React from 'react';
import SvgUri from './react-native-svg-uri/index';
import StyleSheet from '../style';
const Theme =require("../theme").default;

export default class Icon extends React.Component {
  
  getStyle(props){
  	var style =Object.assign({}, props.style||{});
  	var Re = {
  		width:StyleSheet.px(Theme.icon_default.width),
  		color:Theme.icon_color,
  		style:{}
  	};
  	if(style.width){
  		Re.width = style.width;
  	}else{
  		var size = props.size||"default";
  		if(["lg","sm"].indexOf(size)<0){
  			size = "default";
  		}
  		Re.width = StyleSheet.px(Theme["icon_"+size].width);
  	}
  	if(style.color){
  		Re.color = style.color;
  	}else{
  		Re.color = Theme.icon_color;
  	}

  	delete style.width;
  	delete style.color;
  	Re.style = style;
  	return Re;

  }
  render() {

    if (!this.props.icon) {
      return null;
    }
    var StyleConfig = this.getStyle(this.props);

    return (
      <SvgUri
      	style={StyleConfig.style}
        width={StyleConfig.width}
        height={StyleConfig.width}
        svgXmlData={this.props.icon}
        fill={StyleConfig.color}
      />
    );
  }
}
