
import {View,Text,React,Button,PageView,PageContainer} from "react-bricks"

@PageView()
class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };

  componentWillUnmount(){
  }

  onC(){
    this.props.navigation.replace("chat/setting");
  }
  render() {
    return (
      <View>
        <PageContainer {...this.props} owner={this}/>
        <Button onPress={this.onC.bind(this)} title={"Setting"}></Button>
      </View>
    );
  }
}

export default ChatScreen;