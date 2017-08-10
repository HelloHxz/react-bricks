import React from 'react';
import {
  Text,View,Button,
} from 'react-native';
import { observer } from 'mobx-react/native';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => navigate('Chat')}
          title="Chat with Lucy"
        />
        <View style={{width:'100%',height:100,overflow:'hidden'}}>
          <View style={{position:'absolute',width:'100%',transform:[{translateY:-80}],height:100,backgroundColor:'red'}}/>
        </View>

      </View>
    );
  }
}

export default HomeScreen;