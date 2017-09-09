import {View,Text,React,Button,StyleSheet} from "react-bricks"


var Styles = StyleSheet.create({
  testStyle:{
    width:100,
    height:100,
    backgroundColor:"red"
  },
  fontStyle:{
    fontSize:23,
    backgroundColor:"yellow"
  }
});

console.log(Styles);

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
      <View style={{...exS,...{marginTop:20}}}>
        <Button onPress={this.Nav.bind(this)} title="Go"></Button>
        <Text>asdas</Text>
        <Text style={Styles.fontStyle}><Text>bang!</Text>huxiaozhong</Text>
        <View style={Styles.testStyle}></View>
      </View>
    );
  }
}

export default HomeScreen;