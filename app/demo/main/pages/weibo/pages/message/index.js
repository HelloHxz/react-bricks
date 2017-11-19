import {View,Text,React,Button,IOSHeaderPlaceHolder,Theme,StyleSheet,Header,TouchableOpacity,Icon,PageView,PageContainer} from "react-bricks"

@PageView
class MessagePage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
         <IOSHeaderPlaceHolder/>
      </View>
    );
  }
}

export default MessagePage;

