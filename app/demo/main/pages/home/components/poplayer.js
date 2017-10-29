import React from 'react'
import {observer,Poplayer,View,StyleSheet,Button} from "react-bricks"

@observer
class PoplayerManager extends React.Component {


  showOther(){
    this.props.homeStore.popLayerConfig = {key:"other",dirction:"top"};
  }
  poplayerRenderItem(params){
    if(params.key==="some"){
      return <View style={StyleSheet.create({height:300,width:"100%",backgroundColor:"red"})}>
        <Button onPress={this.showOther.bind(this)}>Show</Button>
      </View>
    }else if(params.key==="other"){
      return <View style={StyleSheet.create({height:200,width:"100%",backgroundColor:"orange"})}>
        <Button>Hide</Button>
      </View>
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
      renderItem={
          this.poplayerRenderItem.bind(this)
        }  config={this.props.homeStore.popLayerConfig}/>
    );
  }
}

export default PoplayerManager;