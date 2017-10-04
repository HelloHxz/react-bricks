import {View,Text,React,StyleSheet,PageView,Button} from "react-bricks"

@PageView({rootStore:null,homeStore:null})
class ButtonDemo extends React.Component {
	
  static navigationOptions = {
    title: 'ButtonDemo',
  };

  componentDidMount() {
  }

  render() {
    return (
      <View>
         <Button>按钮</Button>
      </View>
    );
  }
}

export default ButtonDemo;