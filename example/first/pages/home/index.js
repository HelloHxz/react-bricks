import {View,Text,React} from "@bricks"

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    var exS = {backgroundColor:"#fff"};
    return (
      <View style={{...exS,...{marginTop:20}}}><Text>asdas</Text>
        <Text style={{backgroundColor:"yellow",fontSize:23}}>huxiaozhong</Text>
        <View style={{width:100,height:100,backgroundColor:"red"}}></View>
      </View>
    );
  }
}

export default HomeScreen;