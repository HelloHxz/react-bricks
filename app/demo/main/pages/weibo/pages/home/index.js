import {View,Text,React,Button,Theme,StyleSheet,PageView,PageContainer} from "react-bricks"
import svgs from '../../../../assets/svg/svgs.js';

@PageView
class HomePage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
          <Text>Home</Text>
      </View>
    );
  }
}

export default HomePage;

