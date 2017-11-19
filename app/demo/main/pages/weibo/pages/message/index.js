import {View,Text,React,Button,IOSHeaderPlaceHolder,Theme,StyleSheet,Header,TouchableOpacity,Icon,PageView,PageContainer} from "react-bricks"

@PageView
class MessagePage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
         <IOSHeaderPlaceHolder/>
         <View style={StyleSheet.create({height:80,backgroundColor:"#fff",justifyContent:"center",alignItems:"center"})}>
            <Button type='primary' style={StyleSheet.create({backgroundColor:"#eee",height:60,width:700})}>
              <Icon style={StyleSheet.create({fontSize:30,color:"gray"})} icon={Icon.DemoIcons.search}/>
              <Text style={StyleSheet.create({fontSize:26,color:"gray",marginLeft:10})}>搜索</Text>
            </Button>
         </View>
      </View>
    );
  }
}

export default MessagePage;

