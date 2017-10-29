import {View,Text,React,Button,StyleSheet,PageView} from "react-bricks"

@PageView
class MyScreen extends React.Component {
	
  componentDidMount() {
  }

  render() {
    return (
      <View>
          <Text>MyScreen</Text>
      </View>
    );
  }
}

export default MyScreen;