import {View,Text,React,Button,StyleSheet,PageView,Animated} from "react-bricks"


var Styles = StyleSheet.create({
  testStyle:{
    width:StyleSheet.baseScreen.width/3,
    height:100,
    backgroundColor_android:"green",
    backgroundColor_ios:"yellow",
  },
  fontStyle:{
    ...{
      backgroundColor:"yellow"
    },
    ...{
      fontSize:32
    }
  }
});

@PageView({rootStore:null,homeStore:null})
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  componentDidMount() {
  }

  constructor(props){
    super(props);
    this.state = {
      anim: new Animated.Value(0),
    }
  }


  Nav(){
     Animated.timing(this.state.anim, {toValue: 400}).start();
    // this.props.navigation.navigate('chat/my', { user: 'Lucy'})
  }
  render() {
    var exS = {backgroundColor:"#fff"};
    console.log(this.state.anim);
    return (
      <View style={{...exS,...{marginTop:20}}}>
         <Animated.View
          style={{position:"relative",left: this.state.anim,width:StyleSheet.px(100),height:StyleSheet.px(100),backgroundColor:"green"}}>
        </Animated.View>
        <Button onPress={this.Nav.bind(this)} title="Go"></Button>
        <Text>asdas</Text>
        <Text style={Styles.fontStyle}><Text>bang!</Text>huxiaozhong</Text>
        <View style={Styles.testStyle}></View>
      </View>
    );
  }
}

export default HomeScreen;