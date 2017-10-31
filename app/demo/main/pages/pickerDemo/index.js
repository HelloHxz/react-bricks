import {View,Text,React,StyleSheet,Fetch,observer,PageView,TextInput,Button,UIManager,ScrollView,Header,TouchableOpacity,Icon,Theme,Space,Picker} from "react-bricks";
import PickerDemoStore from './store';
import svgs from '../../assets/svg/svgs.js';


var selectorData=[[
  {
    label:"China",
    value:"0",
    children:[
      {label:"China1",value:"C1",
        children:[
          {label:"China11",value:"C11"},
          {label:"China12",value:"C12"},
          {label:"China13",value:"C13"}
        ]
      },
      {label:"China2",value:"C2",
        children:[
          {label:"China21",value:"C21"},
          {label:"China22",value:"C22"},
          {label:"China23",value:"C23"}
        ]},
      {label:"China3",value:"C3",
        children:[
          {label:"China31",value:"C31"},
          {label:"China32",value:"C32"},
          {label:"China33",value:"C33"}
        ]},
      {label:"China4",value:"C4",
        children:[
          {label:"China41",value:"C41"},
          {label:"China42",value:"C42"},
          {label:"China43",value:"C43"}
        ]},
    ]
  },
  {
    label:"USA",
    value:"1",
    children:[
      {label:"USA1",value:"U1",
        children:[
          {label:"USA11",value:"U11"},
          {label:"USA12",value:"U12"},
          {label:"USA13",value:"U13"}
        ]},
      {label:"USA2",value:"U2",
        children:[
          {label:"USA22",value:"U21"},
          {label:"USA23",value:"U22"},
          {label:"USA24",value:"U23"}
        ]},
      {label:"USA3",value:"U3",
        children:[
          {label:"USA31",value:"U31"},
          {label:"USA32",value:"U32"},
          {label:"USA33",value:"U33"}
        ]},
      {label:"USA4",value:"U4",
        children:[
          {label:"USA41",value:"U41"},
          {label:"USA42",value:"U42"},
          {label:"USA43",value:"U43"}
        ]},
    ]
  }

],[
  {
    label:"xxx",
    value:"xxx1"
  },
   {
    label:"x11xx",
    value:"xxx"
  },

]];

@PageView
@observer
export default class PickerDemo extends React.Component {
	
 
  static connectStore(){
    return {PickerStore:new PickerDemoStore};
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

  showPicker(){
    this.props.PickerStore.isShow = true;
  }
  onBackLayerClick(){
    this.props.PickerStore.isShow = false;
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
            <Picker cascadeCount={3} datasource={selectorData}/>
            <Space style={StyleSheet.create({height:40})}/>
            <Picker datasource={selectorData}/>
            <Picker 
              onBackLayerClick = {this.onBackLayerClick.bind(this)}
              show={this.props.PickerStore.isShow} type="pop" datasource={selectorData}/>
            <Space/>
            <Button onPress={this.showPicker.bind(this)}>Show</Button>
         </ScrollView>
      </View>
    );
  }
}

