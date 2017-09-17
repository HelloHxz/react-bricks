import { Text} from 'react-native';
import React from 'react'

class Com extends React.Component {

  componentWillRecevieProps(){

  }

  render() {
  	var style = this.props.style||{};
  	if(this.props.selected){
  		style.color = "red";
  	}

    return (<Text style={style}>{this.props.children}</Text>);
  }
}

export default Com;