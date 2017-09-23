import React from 'react';

class Poplayer extends React.Component {

  onClick(){
  	if(this.props.onPress){
  		this.props.onPress();
  	}
  }	
  render() {
  	var style = this.props.style||{};
    return (<div>DW</div>);
  }
}

export default Poplayer;