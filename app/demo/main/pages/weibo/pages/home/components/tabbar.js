
import {View,Text,React,Button,PageView,PageContainer,StyleSheet,Tabs,observer,Header,TouchableOpacity,Icon} from "react-bricks"

@observer
class Tabbar extends React.Component {
 
  constructor(props){
    super(props);

  
  }


  componentWillUnmount(){
  }

  segChange(params){
    this.props.homeStore.tabSelectedKey = params.selectedData.key;
  }

  tabsRenderItem(params){
    var iconStyle = params.selected?{color:"orange"}:{};
    var textStyle = params.selected?{color:"orange"}:{color:"#aaa"};
    return  [ 
               <Text style={textStyle} key='text'>{params.itemData.text}</Text>
            ] 
  }

  render() {
    return (
        <Tabs 
          style={StyleSheet.create({backgroundColor:"#fff",height:84,width:300})}
          data={this.props.data}
          itemStyle={{}}
          renderItem={this.tabsRenderItem.bind(this)}
          selectedKey={this.props.homeStore.tabSelectedKey} 
          onChange={this.segChange.bind(this)}>
        </Tabs>
    );
  }
}

export default Tabbar;

