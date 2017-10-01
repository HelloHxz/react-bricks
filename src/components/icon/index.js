import React from 'react';
import SvgUri from './react-native-svg-uri/index';
import StyleSheet from '../style'

export default class Icon extends React.Component {
  render() {
    const {
      style,
    } = this.props;
    const { width, height, color, ...restStyle } = style;

    if (!this.props.icon) {
      return null;
    }

    return (
      <SvgUri
        style={{ ...restStyle }}
        width={width || StyleSheet._px(64)}
        height={height || StyleSheet._px(64)}
        svgXmlData={this.props.icon}
        fill={color}
      />
    );
  }
}
