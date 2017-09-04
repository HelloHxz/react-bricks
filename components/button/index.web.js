import React from 'react';

class Button extends React.Component {
  render() {
  	var style = this.props.style||{};
    return (<Button  style={style} className='bri-Button'>{this.props.children}</Button>);
  }
}

export default Button;