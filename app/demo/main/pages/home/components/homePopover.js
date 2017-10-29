import React from 'react'
import {observer,Popover,View,StyleSheet,Button} from "react-bricks"

@observer
class PopoverManager extends React.Component {


  onBackLayerClick(){
     this.props.homeStore.popoverConfig = null;
  }


  renderItem(){
    return <View style={StyleSheet.create({width:250,borderRadius:10,height:300,backgroundColor:"#fff"})}>
    
    </View>;
  }

  render() {
    return (
      <Popover 
      renderItem={this.renderItem.bind(this)}
      onBackLayerClick={
        this.onBackLayerClick.bind(this)
      }
      config={this.props.homeStore.popoverConfig}/>
    );
  }
}

export default PopoverManager;