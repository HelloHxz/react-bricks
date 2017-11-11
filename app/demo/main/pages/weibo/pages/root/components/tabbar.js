
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
    var icon = params.itemData.icon;
    if(params.selected){
      textStyle.color = "orange";
      icon = params.itemData.selectedIcon;
    }
    return  [ 
               <Icon style={iconStyle} key='icon' icon={icon}/>,
               <Text style={StyleSheet.create(textStyle)} key='text'>{params.itemData.text}</Text>
            ] 
  }

  render() {
    return (
        <Tabs 
          style={{backgroundColor:"#fff"}}
          size='lg'
          data={[
            {key:"weibo/home",text:"首页",icon:Icon.DemoIcons.home,selectedIcon:Icon.DemoIcons.home_fill},
            {key:"weibo/discover",text:"发现",icon:Icon.DemoIcons.camera,selectedIcon:Icon.DemoIcons.camera_fill},
            {key:"weibo/message",text:"消息",icon:Icon.DemoIcons.community,selectedIcon:Icon.DemoIcons.community_fill},
            {key:"weibo/me",text:"我",icon:Icon.DemoIcons.people,selectedIcon:Icon.DemoIcons.people_fill}
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

