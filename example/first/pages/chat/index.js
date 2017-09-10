import {View,Text,React,Button,PageView} from "react-bricks"

@PageView()
class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };

  componentWillUnmount(){
  }
  render() {
    console.log(this.props.navigation);
    return (
      <Text>lalal</Text>
    );
  }
}

export default ChatScreen;