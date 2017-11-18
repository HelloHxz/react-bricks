import { Text} from 'react-native';
import React from 'react'

class Com extends React.Component {

  componentWillReceiveProps(props){

  }

  render() {
    return (<Text {...this.props}>{this.props.children}</Text>);
  }
}

export default Com;