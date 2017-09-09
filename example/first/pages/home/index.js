import {View,Text,React,Button,StyleSheet} from "react-bricks"


var Styles = StyleSheet.create({
  testStyle:{
    width:250,
    height:100,
    backgroundColor:"red"
  },
  fontStyle:{
    ...{
      backgroundColor:"yellow"
    },
    ...{
      fontSize:23
    }
  }
});


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