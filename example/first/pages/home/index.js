import {View,Text,React,Button} from "@bricks"

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  Nav(){
    this.props.navigation.navigate('chat', { user: 'Lucy' })
  }
  render() {
    var exS = {backgroundColor:"#fff"};
    return (
      <View style={{...exS,...{marginTop:20}}}><Text>asdas</Text>
        <Button onPress={this.Nav.bind(this)} title="Go"></Button>
        <Text style={{backgroundColor:"yellow",fontSize:23}}>huxiaozhong</Text>
        <View style={{width:100,height:100,backgroundColor:"red"}}></View>
      </View>
    );
  }
}

export default HomeScreen;