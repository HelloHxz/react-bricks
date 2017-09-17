import React from 'react';

class View extends React.Component {
	//配合animate 处理单位
  render() {
  	var style = this.props.style||{};
  	// console.log(this.props.xzIsAnimate);
  	var className= 'xz-displayflex';
    return (<div className={className} style={style}>{this.props.children}</div>);
  }
}

export default View;