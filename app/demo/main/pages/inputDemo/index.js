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
    this.props.InputStore.FormData.Text1 =text
  }


  render() {
    return (
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon style={{color:"blue"}} icon={svgs.left}/></TouchableOpacity>
        </Header>
        <ScrollView  
            keyboardShouldPersistTaps="handled" 
            keyboardDismissMode="on-drag" 
            style={StyleSheet.create({flex:1})}>
            <Space style={StyleSheet.create({height:40})}/>
            <TextInput onChange={this.onChangeText.bind(this)} 
              placeholder="请填写姓名"
              value = {this.props.InputStore.FormData.Text1}/>
               <Space style={StyleSheet.create({height:40})}/>
            <TextInput onChange={this.onChangeText.bind(this)} 
              placeholder="请填写姓名"
              style={StyleSheet.create({borderWidth:1,borderColor:"#ccc",width:300,borderRadius:8,borderStyle:"solid"})}
              value = {this.props.InputStore.FormData.Text1}/>
         </ScrollView>
      </View>
    );
  }
}

