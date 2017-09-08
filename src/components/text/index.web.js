import React from 'react';

class View extends React.Component {
  render() {
  	var style = this.props.style||{};
    return (<span  style={style} className='bri-span'>{this.props.children}</span>);
  }
}

export default View;