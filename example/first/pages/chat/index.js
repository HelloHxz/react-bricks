
import {View,Text,React,Button,PageView,PageContainer} from "react-bricks"

@PageView()
class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };

  constructor(props){
    super(props);
  }


  componentWillUnmount(){
  }

  onC(){
      this.props.navigation.replace("chat/setting");
  }
  
   onCMy(){
      this.props.navigation.replace("chat/my");
  }
  render() {
    return (
      <View style={{flex:1}}>
        <PageContainer {...this.props} owner={this}/>
        <Button onPress={this.onC.bind(this)} title={"Setting"}></Button>
        <Button onPress={this.onCMy.bind(this)} title={"My"}></Button>
      </View>
    );
  }
}

export default ChatScreen;