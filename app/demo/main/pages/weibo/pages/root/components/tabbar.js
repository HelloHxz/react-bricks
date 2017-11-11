
import {View,Text,React,Button,PageView,PageContainer,StyleSheet,Tabs,observer,Header,TouchableOpacity,Icon} from "react-bricks"

@observer
class Tabbar extends React.Component {
 
  constructor(props){
    super(props);

  
  }


  componentWillUnmount(){
  }


  showMidPage(e){
    e.preventDefault();
    this.props.rootStore.showMidPage = true;
  }

  segChange(params){
    if(params.selectedData.key==='add'){
      
      return;
    }
    this.props.navigation.replace(params.selectedData.key);
  }

  tabsRenderItem(params){
    if(params.itemData.key==='add'){
      return <Button 
        onPress = {this.showMidPage.bind(this)}
        type='primary' style={StyleSheet.create({backgroundColor:"orange",width:100,height:78})}>
        <Icon style={StyleSheet.create({color:"#fff",fontSize:58})} key='add' icon={ Icon.DemoIcons.add}/>
      </Button>
    }
    var iconStyle = params.selected?{color:"orange"}:{};
    var textStyle = {fontSize:21,marginTop:3};
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
          indicator={false}
          style={{backgroundColor:"#fff"}}
          size='lg'
          data={[
            {key:"weibo/home",text:"首页",icon:Icon.DemoIcons.home,selectedIcon:Icon.DemoIcons.home_fill},
            {key:"weibo/discover",text:"发现",icon:Icon.DemoIcons.camera,selectedIcon:Icon.DemoIcons.camera_fill},
            {key:"add"},
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

