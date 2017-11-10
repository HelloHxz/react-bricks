
import {View,Text,React,Button,PageView,PageContainer,StyleSheet,Tabs,observer,Header,TouchableOpacity,Icon} from "react-bricks"
import svgs from '../../../../../assets/svg/svgs.js';

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
    return  [ 
               <Icon key='icon' selected={params.selected} style={{color:"blue"}} icon={params.itemData.icon}/>,
               <Text key='text' selected={params.selected}>{params.itemData.text}</Text>
            ] 
  }

  render() {
    return (
        <Tabs 
          style={{backgroundColor:"#fff"}}
          size='lg'
          data={[
            {key:"weibo/home",text:"Home",icon:svgs.home},
            {key:"weibo/discover",text:"Discover",icon:svgs.search},
            {key:"weibo/message",text:"Message",icon:svgs.search},
            {key:"weibo/me",text:"Me",icon:svgs.search}
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

