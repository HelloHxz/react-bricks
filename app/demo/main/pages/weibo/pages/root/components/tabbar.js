
import {View,Text,React,Button,PageView,PageContainer,StyleSheet,Tabs,observer,Header,TouchableOpacity,Icon} from "react-bricks"

@observer
class Tabbar extends React.Component {
 
  constructor(props){
    super(props);

  
  }


  componentWillUnmount(){
  }

  segChange(params){
    this.props.navigation.replace(params.selectedData.key);
  }

  tabsRenderItem(params){
    var iconStyle = params.selected?{color:"orange"}:{};
    var textStyle = {fontSize:24,marginTop:4};
    if(params.selected){
      textStyle.color = "orange";
    }
    return  [ 
               <Icon style={iconStyle} key='icon' icon={params.itemData.icon}/>,
               <Text style={StyleSheet.create(textStyle)} key='text'>{params.itemData.text}</Text>
            ] 
  }

  render() {
    return (
        <Tabs 
          style={{backgroundColor:"#fff"}}
          size='lg'
          data={[
            {key:"weibo/home",text:"首页",icon:Icon.DemoIcons.home},
            {key:"weibo/discover",text:"发现",icon:Icon.DemoIcons.search},
            {key:"weibo/message",text:"消息",icon:Icon.DemoIcons.search},
            {key:"weibo/me",text:"我",icon:Icon.DemoIcons.search}
          ]}
          itemStyle={{}}
          renderItem={this.tabsRenderItem.bind(this)}
          selectedKey={this.props.rootStore.tabSelectedKey} 
          onChange={this.segChange.bind(this)}>
        </Tabs>
    );
  }
}

export default Tabbar;

