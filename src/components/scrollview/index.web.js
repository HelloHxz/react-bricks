import React from 'react';
import View from '../view';
import './index.less'

export default class ScrollView extends React.Component {
  render() {
  	var style = this.props.style||{};
    return (<View style={style} className='xz-n-scrollview'>{this.props.children}</View>);
  }
}

