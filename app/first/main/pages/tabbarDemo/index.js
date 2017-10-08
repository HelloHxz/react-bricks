
import {View,Text,React,Button,PageView,PageContainer,StyleSheet,Segment,observer,Header,TouchableOpacity,Icon} from "react-bricks"
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
  render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff",overflow:"hidden"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon style={{color:"blue"}} icon={svgs.left}/></TouchableOpacity>
        </Header>
        <PageContainer {...this.props} owner={this}/>
        <Segment 
          selectedKey={this.props.chatStore.tabSelectedKey} 
          onChange={this.segChange.bind(this)}>
          <Segment.Item key="tabbardemo/setting">
             <Text>Setting</Text>
          </Segment.Item>
          <Segment.Item key='tabbardemo/my'>
             <Text>My</Text>
          </Segment.Item>
        </Segment>
      </View>
    );
  }
}

export default ChatScreen;