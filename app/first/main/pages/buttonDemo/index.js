import {View,Text,React,StyleSheet,PageView,Button,Header,TouchableOpacity,Icon} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';

@PageView({rootStore:null,homeStore:null})
class ButtonDemo extends React.Component {
	
  static navigationOptions = {
    header: null
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
         <Button>按钮</Button>
      </View>
    );
  }
}

export default ButtonDemo;