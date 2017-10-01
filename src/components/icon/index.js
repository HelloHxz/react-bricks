import React from 'react';
import SvgUri from './react-native-svg-uri/index';

export default class Icon extends React.Component {
  render() {
    const {
      style,
      color,
    } = this.props;
    const { width, height, fill, ...restStyle } = style || { width: 22, height: 22 };

    if (!this.props.icon) {
      return null;
    }

    return (
      <SvgUri
        style={{ ...restStyle }}
        width={width || 22}
        height={height || 22}
        svgXmlData={this.props.icon}
        fill={fill}
      />
    );
  }
}
