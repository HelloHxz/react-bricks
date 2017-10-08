import React from 'react';
import './index.less'
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

    var classNameArr = [];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }
    if(style.displax==='flex'||style.flexDirection||style.alignItems||style.justifyContent){
      classNameArr.push("xz-displayflex");
    }
    if(style.justifyContent){
      classNameArr.push("xz-justifycontent-"+style.justifyContent);
    }

    if(style.flexDirection){
      classNameArr.push("xz-flexdirection-"+style.flexDirection);
    }


    if(style.alignItems){
      classNameArr.push("xz-alignitems-"+style.alignItems);
    }

    var onPress = {};
    if(this.props.onPress){
      onPress.onClick = this.props.onPress;
    }

    return (<div {...onPress} ref={(node)=>{this.node = node;}} className={classNameArr.join(" ")} style={style}>{this.props.children}</div>);
  }
}

export default View;