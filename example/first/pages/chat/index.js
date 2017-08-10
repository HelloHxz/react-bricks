import React from 'react';
import {
  Text,View,Button,
} from 'react-native';
import { observer } from 'mobx-react/native';

class ChatScreen extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy',
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

export default ChatScreen;