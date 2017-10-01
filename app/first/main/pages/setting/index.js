import {View,Text,React,Button,StyleSheet,PageView} from "react-bricks"

@PageView({rootStore:null,homeStore:null})
class SettingScreen extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View>
          <Text>SettingScreen2</Text>
      </View>
    );
  }
}

export default SettingScreen;