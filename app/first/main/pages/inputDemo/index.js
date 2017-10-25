import {View,Text,React,StyleSheet,observer,PageView,TextInput,Button,UIManager,ScrollView,Header,TouchableOpacity,Icon,Theme,Space} from "react-bricks";
import InputDemoStore from './store';
import svgs from '../../assets/svg/svgs.js';


@PageView
@observer
export default class InputDemo extends React.Component {
	
 
  static connectStore(){
    return {InputStore:new InputDemoStore};
  }

  static navigationOptions = {
    gesturesEnabled:false,
    header:null
  }
  componentDidMount() {
  }
  // onPageBeforeLeave(){
  //   return false;
  // }

  goBack(){
    this.props.navigation.goBack();
  }

  onChangeText(e,text){
    console.log(text);
    this.props.InputStore.FormData.Text1 =text
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon style={{color:"blue"}} icon={svgs.left}/></TouchableOpacity>
        </Header>
        <ScrollView style={StyleSheet.create({flex:1,paddingLeft:40,paddingRight:40})}>
            <Space style={StyleSheet.create({height:40})}/>
            <TextInput onChange={this.onChangeText.bind(this)} 
              value = {this.props.InputStore.FormData.Text1} style={{backgroundColor:"#eee"}}/>
         </ScrollView>
      </View>
    );
  }
}

