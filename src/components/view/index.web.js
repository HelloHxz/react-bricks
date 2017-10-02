import React from 'react';
import StyleSheet from '../style'

class View extends React.Component {
	//配合animate 处理单位
  render() {
  	var style = this.props.style||{};
  	//todo..完善 margin padding
  	if(style.height&&!isNaN(style.height)){
  		style.height = style.height+"rem";
  	}
  	if(style.width&&!isNaN(style.width)){
  		style.width = style.width+"rem";
  	}
  	style = StyleSheet.convertTransform(style);
  	var className= style.flex?'xz-displayflex':"";
    return (<div ref={(node)=>{this.node = node;}} className={className} style={style}>{this.props.children}</div>);
  }
}

export default View;