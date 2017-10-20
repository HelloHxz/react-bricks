
import {View,Text,React,Button,PageView,PageContainer,StyleSheet,Tabs,observer,Header,TouchableOpacity,Icon} from "react-bricks"
import Store from './store'
import svgs from '../../assets/svg/svgs.js';
import Tabbar from './components/tabbar'

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

  render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff",overflow:"hidden"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon style={{color:"blue"}} icon={svgs.left}/></TouchableOpacity>
        </Header>
        <PageContainer {...this.props} owner={this}/>
        <Tabbar 
          navigation={this.props.navigation}
          chatStore={this.props.chatStore}>
        </Tabbar>
      </View>
    );
  }
}

export default ChatScreen;