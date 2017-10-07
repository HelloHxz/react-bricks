import {View,Icon,Text,React,StyleSheet,PageView,Button,Header,TouchableOpacity} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';

@PageView({rootStore:null,homeStore:null})
class IconDemo extends React.Component {
	
  static navigationOptions = {
    header:null
  };

  componentDidMount() {
  }

  goBack(){
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={svgs.left}/></TouchableOpacity>
        </Header>
        <Icon icon={svgs.saoyisao} size='lg'/>
        <Icon icon={svgs.search}/>
        <Icon icon={svgs.home} size='sm'/>
      </View>
    );
  }
}

export default IconDemo;