import React from 'react'
import {observer,Poplayer,View,StyleSheet,Button,PlatForm} from "react-bricks"

@observer
class HomeDropGroup extends React.Component {


  showOther(){
    this.props.rootStore.popLayerConfig = {key:"hot",dirction:"top"};
  }
  poplayerRenderItem(params){
    if(params.key==="guanzhu"){
      return <View style={StyleSheet.create({height:300,width:"100%",backgroundColor:"red"})}>
        <Button onPress={this.showOther.bind(this)}>Show</Button>
      </View>
    }else if(params.key==="hot"){
      return <View style={StyleSheet.create({height:200,width:"100%",backgroundColor:"orange"})}>
        <Button>Hide</Button>
      </View>
    }
    return <View style={StyleSheet.create({height:230,width:"100%",backgroundColor:"red"})}>
      <Text>No {params.key} in RenderItem callBack</Text>
    </View>
  }

  onBackLayerClick(){
    //this.props.rootStore.homeStore.tabSelectedKey = "hot";
    this.props.rootStore.popLayerConfig = {};
  }

  render() {
    return (
      <Poplayer 
      wrapperStyle={StyleSheet.create({top:PlatForm.OS==='ios'?(85+24):85})}
      onBackLayerClick={
        this.onBackLayerClick.bind(this)
      }
      renderItem={
          this.poplayerRenderItem.bind(this)
        }  config={this.props.rootStore.popLayerConfig}/>
    );
  }
}

export default HomeDropGroup;