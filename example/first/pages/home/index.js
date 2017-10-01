import {View,Text,React,Button,StyleSheet,PageView,Animated,observer,UIManager} from "react-bricks"
import Poplayer from './components/poplayer'
import HomeStore from './store'
import HomePopover from './components/homePopover'


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

@observer
@PageView({rootStore:null,homeStore:HomeStore})
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


  Nav(e){
    UIManager.measure(e.currentTarget,(x, y, width, height, left, top)=>{
       this.props.homeStore.popoverConfig = {rect:{
        x:x,
        y:y,
        width:width,
        height:height
       },dirction:"top"}
    })
    //this.props.homeStore.popLayerConfig = {key:"some",dirction:"top"}
     // Animated.timing(this.state.anim, {toValue: 300}).start();
    // this.props.navigation.navigate('chat/my', { user: 'Lucy'})
  }
  render() {
    var exS = {backgroundColor:"#fff"};
    return (
      <View style={{flex:1}}>
         <Animated.View
          style={{position:"relative",
          transform: [{translateX: this.state.anim}],width:StyleSheet.px(100),height:StyleSheet.px(100),backgroundColor:"green"}}>
        </Animated.View>
        <HomePopover homeStore={this.props.homeStore}/>
        <Poplayer homeStore={this.props.homeStore}/>
        <Button onPress={this.Nav.bind(this)}>Go</Button>
        <Text>asdas</Text>
        <Text style={Styles.fontStyle}><Text>bang!</Text>huxiaozhong</Text>
        <View style={Styles.testStyle}></View>
      </View>
    );
  }
}

export default HomeScreen;