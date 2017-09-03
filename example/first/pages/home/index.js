import React from 'react';
import {View,Text} from "../../../../components"

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    return (
      <View style={{backgroundColor:"red"}}><Text>asdas</Text>
        <Text style={{color:"red"}}>huxiaozhong</Text>
      </View>
    );
  }
}

export default HomeScreen;