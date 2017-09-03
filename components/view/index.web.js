import React from 'react';

class View extends React.Component {
  render() {
  	var style = this.props.style||{};
    return (<div style={style}>{this.props.children}</div>);
  }
}

export default View;