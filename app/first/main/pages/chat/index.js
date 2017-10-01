
import {View,Text,React,Button,PageView,PageContainer,Segment,observer} from "react-bricks"
import Store from './store'

@PageView({chatStore:Store})
@observer
class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };

  constructor(props){
    super(props);

    props.navigation.listenRouteChange(this,(params)=>{
      if(this.props.chatStore.tabSelectedKey!==params.tabPath){
        this.props.chatStore.tabSelectedKey = params.tabPath;
      }
    });
  }


  componentWillUnmount(){
  }

  segChange(params){
    this.props.navigation.replace(params.selectedKey);
  }
  render() {
    return (
      <View style={{flex:1}}>
        <PageContainer {...this.props} owner={this}/>
        <Segment 
          selectedKey={this.props.chatStore.tabSelectedKey} 
          onChange={this.segChange.bind(this)}>
          <Segment.Item key="chat/setting">
             <Text>Setting</Text>
          </Segment.Item>
          <Segment.Item key='chat/my'>
             <Text>My</Text>
          </Segment.Item>
        </Segment>
      </View>
    );
  }
}

export default ChatScreen;