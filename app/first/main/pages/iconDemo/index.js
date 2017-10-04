import {View,Icon,Text,React,StyleSheet,PageView,Button} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';

@PageView({rootStore:null,homeStore:null})
class IconDemo extends React.Component {
	
  static navigationOptions = {
    title: 'IconDemo',
  };

  componentDidMount() {
  }

  render() {
    return (
      <View>
        <Icon icon={svgs.saoyisao} size='lg'/>
        <Icon icon={svgs.search}/>
        <Icon icon={svgs.home} size='sm'/>
      </View>
    );
  }
}

export default IconDemo;