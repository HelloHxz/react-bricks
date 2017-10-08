
import {View,Text,React,Button,PageView,PageContainer,StyleSheet,Tabs,observer,Header,TouchableOpacity,Icon} from "react-bricks"
import Store from './store'
import svgs from '../../assets/svg/svgs.js';

@PageView({chatStore:Store})
@observer
class ChatScreen extends React.Component {
  static navigationOptions = {
    header:null
  };

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
    this.props.navigation.replace(params.selectedKey);
  }
  renderItem(config){
    return  [ 
               <Icon key='icon' selected={config.key===this.props.chatStore.tabSelectedKey} style={{color:"blue"}} icon={config.icon}/>,
               <Text key='text' selected={config.key===this.props.chatStore.tabSelectedKey}>{config.text}</Text>
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
          data={[
            {key:"tabbardemo/setting",text:"",icon:""},
            {key:"tabbardemo/setting",text:"",icon:""}
          ]}
          itemStyle={{}}
          renderItem={{}}
          selectedKey={this.props.chatStore.tabSelectedKey} 
          onChange={this.segChange.bind(this)}>
          <Tabs.Item key="tabbardemo/setting">
            {this.renderItem({
              text:'Setting',
              key:"tabbardemo/setting",
              icon:svgs.search
            })}
          </Tabs.Item>
          <Tabs.Item key='tabbardemo/my'>
              {this.renderItem({
              text:'My',
              key:"tabbardemo/my",
              icon:svgs.home
            })}
          </Tabs.Item>
        </Tabs>
      </View>
    );
  }
}

export default ChatScreen;