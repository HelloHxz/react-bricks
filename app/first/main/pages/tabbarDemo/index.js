
import {View,Text,React,Button,PageView,PageContainer,StyleSheet,Tabs,observer,Header,TouchableOpacity,Icon} from "react-bricks"
import Store from './store'
import svgs from '../../assets/svg/svgs.js';

@PageView
@observer
class ChatScreen extends React.Component {
  static navigationOptions = {
    header:null
  };

  static connectStore(){
    return {chatStore:Store};
  }

  constructor(props){
    super(props);

    props.navigation.listenRouteChange(this,(params)=>{
      if(this.props.chatStore.tabSelectedKey!==params.tabPath){
        this.props.chatStore.tabSelectedKey = params.tabPath;
      }
    });
  }

  goBack(){
    this.props.navigation.goBack();
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
      <View style={{flex:1,backgroundColor:"#fff",overflow:"hidden"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon style={{color:"blue"}} icon={svgs.left}/></TouchableOpacity>
        </Header>
        <PageContainer {...this.props} owner={this}/>
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
      </View>
    );
  }
}

export default ChatScreen;