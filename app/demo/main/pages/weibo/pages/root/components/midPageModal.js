import {View,Text,React,Icon,Button,Theme,TouchableOpacity,StyleSheet,PageView,observer} from "react-bricks"

@observer
class MidlePage extends React.Component {

  midPageHide(){
    this.props.rootStore.showMidPage = false;
  }

  componentDidMount() {
  }

  componentWillUnmount(){
  }

  hideMidPage(){
    this.props.hideMidPage();
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex:1}}></View>
        <TouchableOpacity
          onPress = {this.hideMidPage.bind(this)}
          style={StyleSheet.create({height:92,borderTopWidth:1,borderStyle:"solid",justifyContent:"center",alignItems:"center",borderColor:"#ccc"})}
        >
          <Icon rotate={45} style={StyleSheet.create({color:"gray",fontSize:58})} key='add' icon={ Icon.DemoIcons.add}/>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MidlePage;

