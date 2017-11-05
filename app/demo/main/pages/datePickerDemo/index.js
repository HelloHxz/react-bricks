import {View,Text,React,
    DatePicker,
    StyleSheet,Fetch,observer,PageView,TextInput,Button,UIManager,ScrollView,Header,TouchableOpacity,Icon,Theme,Space,Picker} from "react-bricks";
import DatePickerDemoStore from './store';
import svgs from '../../assets/svg/svgs.js';


@PageView
@observer
export default class DatePickerDemo extends React.Component {
	
 
  static connectStore(){
    return {DatePickerStore:new DatePickerDemoStore};
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

  onDateChange(){

  }

  showPicker(){ 
    this.props.DatePickerStore.isShow = true;
  }


  onBackLayerClick(){
    this.props.DatePickerStore.isShow = false;
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
            <DatePicker onDateChange={this.onDateChange.bind(this)} date={new Date()} mode="date"/>

            <DatePicker 
              onBackLayerClick={this.onBackLayerClick.bind(this)}
              onDateChange={this.onDateChange.bind(this)} 
              type='pop' 
              show={this.props.DatePickerStore.isShow} date={new Date()} mode="date"/>
            <Button onPress={this.showPicker.bind(this)}>Show</Button>
         </ScrollView>
      </View>
    );
  }
}

