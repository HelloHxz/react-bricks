import {View,Text,React,Button,Theme,StyleSheet,PageView,PageContainer} from "react-bricks"

@PageView
class DiscoverPage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
          <Text>Discover</Text>
      </View>
    );
  }
}

export default DiscoverPage;

