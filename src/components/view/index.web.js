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
    

  	style = StyleSheet.convertTransform(style,this.props.xzIsAnimate);

    var classNameArr = ["xz-view"];
    if(this.props.className){
      classNameArr.push(this.props.className);
    }
    if(style.displax==='flex'||style.flexDirection||style.alignItems||style.flexWrap||style.justifyContent){
      classNameArr.push("xz-displayflex");
    }
    if(style.justifyContent){
      classNameArr.push("xz-justifycontent-"+style.justifyContent);
    }

    if(style.flexWrap){
      classNameArr.push("xz-flexwrap-"+style.flexWrap);
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

    var touchs = {};
    if(this.props.onTouchStart){
      touchs.onTouchStart = this.props.onTouchStart;
    }
    if(this.props.onTouchMove){
      touchs.onTouchMove = this.props.onTouchMove;
    }
    if(this.props.onTouchEnd){
      touchs.onTouchEnd = this.props.onTouchEnd;
    }

    return (<div {...onPress} {...touchs} ref={(node)=>{this.node = node;}} className={classNameArr.join(" ")} style={style}>{this.props.children}</div>);
  }
}

export default View;