import React from 'react'
import {observer,Popover,View,StyleSheet,Button} from "react-bricks"

@observer
class PopoverManager extends React.Component {


  onBackLayerClick(){
     this.props.popoverStore.popoverConfig = null;
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
      config={this.props.popoverStore.popoverConfig}/>
    );
  }
}

export default PopoverManager;