import React from 'react';

class View extends React.Component {
  render() {
    return (<span>{this.props.children}</span>);
  }
}

export default View;