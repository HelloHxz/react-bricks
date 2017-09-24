import React from 'react';

function convertTransform(style){
	if(!style.transform){
		return style;
	}
	var transform = style.transform;
	var transformStrArr = [];
	for(var i=0,j=transform.length;i<j;i++){
		var kv = transform[i];
		for(var key in kv){
			if(key==="translateX"||key==="translateY"){
				transformStrArr.push(key+"("+kv[key]+"rem)");
			}
		}
	}

	style.transform = transformStrArr.join(","); 
	return style;

}

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
  	if(this.props.xzIsAnimate){
  		style = convertTransform(style);
  	}
  	var className= 'xz-displayflex';
    return (<div className={className} style={style}>{this.props.children}</div>);
  }
}

export default View;