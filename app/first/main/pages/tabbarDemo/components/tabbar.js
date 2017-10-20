
import {View,Text,React,Button,PageView,PageContainer,StyleSheet,Tabs,observer,Header,TouchableOpacity,Icon} from "react-bricks"
import svgs from '../../../assets/svg/svgs.js';

@observer
export default class Tabbar extends React.Component {
 
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
          style={{backgroundColor:"#f2f3f4"}}
          size='lg'
          data={[
            {key:"tabbardemo/setting",text:"Setting",icon:svgs.home},
            {key:"tabbardemo/my",text:"my",icon:svgs.search}
          ]}
          itemStyle={{}}
          renderItem={this.tabsRenderItem.bind(this)}
          selectedKey={this.props.chatStore.tabSelectedKey} 
          onChange={this.segChange.bind(this)}>
        </Tabs>
    );
  }
}

