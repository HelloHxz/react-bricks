import React from 'react'
import {observer,Poplayer,View,StyleSheet} from "react-bricks"

@observer
class PoplayerManager extends React.Component {


  poplayerRenderItem(params){
      console.log("init "+params.key);

    if(params.key==="some"){
      return <View style={StyleSheet.create({height:300,width:"100%",backgroundColor:"red"})}></View>
    }
    return <View style={StyleSheet.create({height:230,width:"100%",backgroundColor:"red"})}>
      <Text>No {params.key} in RenderItem callBack</Text>
    </View>
  }

  onBackLayerClick(){
     this.props.homeStore.popLayerConfig = null;
  }

  render() {
    return (
      <Poplayer 
      onBackLayerClick={
        this.onBackLayerClick.bind(this)
      }
      onRenderItem={
          this.poplayerRenderItem.bind(this)
        }  config={this.props.homeStore.popLayerConfig}/>
    );
  }
}

export default PoplayerManager;