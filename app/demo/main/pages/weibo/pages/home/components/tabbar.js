
import {View,Text,React,Button,PageView,PageContainer,StyleSheet,Tabs,observer,Header,TouchableOpacity,Icon} from "react-bricks"

@observer
class Tabbar extends React.Component {
 
  constructor(props){
    super(props);

    this.state={
      seed:0
    }

  
  }


  componentWillUnmount(){
  }

  segChange(params){
    if(this.props.homeStore.tabSelectedKey=== params.selectedData.key){
      if(this.props.rootStore.popLayerConfig.key === params.selectedData.key){
        this.props.rootStore.popLayerConfig={};
      }else{
         this.props.rootStore.popLayerConfig = {key:params.selectedData.key,dirction:"top"}
      }

      this.setState({
        seed:this.state.seed+1
      });
    }else{
       if(this.props.rootStore.popLayerConfig.key){
        this.props.rootStore.popLayerConfig = {};
      }
      this.props.homeStore.tabSelectedKey = params.selectedData.key;
    }
   
  }

  tabsRenderItem(params){
    var iconStyle = params.selected?{color:"orange"}:{};
    var textStyle = params.selected?{color:"orange"}:{color:"#aaa"};
    var re = [ 
               <Text style={textStyle} key='text'>{params.itemData.text}</Text>
            ] ;
    var iconColor = "#fff";
    if( params.itemData.key === this.props.homeStore.tabSelectedKey){
      iconColor = "#333";
    }
    var rotate = {rotate:0};
    if(this.props.rootStore.popLayerConfig.key===params.itemData.key){
      rotate = {rotate:180};
    }
    re.push(<Icon key='icon' {...rotate} style={StyleSheet.create({fontSize:24,color:iconColor,marginLeft:4})} icon={Icon.DemoIcons.dropdown}></Icon>);


    return  re
  }

  render() {
    return (
        <Tabs 
          style={StyleSheet.create({backgroundColor:"#fff",height:84,width:300})}
          data={this.props.data}
          itemStyle={{flexDirection:"row"}}
          renderItem={this.tabsRenderItem.bind(this)}
          selectedKey={this.props.homeStore.tabSelectedKey} 
          onChange={this.segChange.bind(this)}>
        </Tabs>
    );
  }
}

export default Tabbar;

