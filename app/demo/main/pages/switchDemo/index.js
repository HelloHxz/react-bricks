import {View,Text,React,StyleSheet,PageView,ScrollView,Button,Switch,Space,Swiper,Header,TouchableOpacity,Icon} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';

@PageView
export default class SwitchDemo extends React.Component {
	
  static navigationOptions = {
    header: null,
  };
  

  goBack(){
    this.props.navigation.goBack();
  }
  
  componentDidMount() {
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff",overflow:"hidden"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={svgs.left}/></TouchableOpacity>
        </Header>
        <ScrollView>
          <Space/>
          <Switch/>
        </ScrollView>
      </View>
    );
  }
}

