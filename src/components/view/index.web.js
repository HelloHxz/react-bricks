import React from 'react';

class View extends React.Component {
  render() {
  	var style = this.props.style||{};
  	var className= 'xz-displayflex';
    return (<div className={className} style={style}>{this.props.children}</div>);
  }
}

export default View;