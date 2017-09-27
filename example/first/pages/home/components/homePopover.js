import React from 'react'
import {observer,Popover,View,StyleSheet,Button} from "react-bricks"

@observer
class PopoverManager extends React.Component {


  onBackLayerClick(){
     this.props.homeStore.popoverConfig = null;
  }

  render() {
    return (
      <Popover 
      onBackLayerClick={
        this.onBackLayerClick.bind(this)
      }
      config={this.props.homeStore.popoverConfig}/>
    );
  }
}

export default PopoverManager;