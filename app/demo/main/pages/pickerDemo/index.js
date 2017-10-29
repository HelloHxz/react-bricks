import {View,Text,React,StyleSheet,Fetch,observer,PageView,TextInput,Button,UIManager,ScrollView,Header,TouchableOpacity,Icon,Theme,Space,Picker} from "react-bricks";
import PickerDemoStore from './store';
import svgs from '../../assets/svg/svgs.js';


var selectorData=[[
  {
    label:"China",
    value:"0",
    children:[
      {label:"Cf2",value:"C1",
        children:[
          {label:"CC",value:"C11"},
          {label:"CC",value:"C12"},
          {label:"CC",value:"C13"}
        ]
      },
      {label:"C4",value:"C2",
        children:[
          {label:"CC2",value:"C21"},
          {label:"CC3",value:"C22"},
          {label:"CC1",value:"C23"}
        ]},
      {label:"Cs",value:"C3",
        children:[
          {label:"CC2",value:"C31"},
          {label:"CC4",value:"C32"},
          {label:"CC5",value:"C33"}
        ]},
      {label:"Cds",value:"C4",
        children:[
          {label:"CC6",value:"C41"},
          {label:"CC3",value:"C42"},
          {label:"CC",value:"C43"}
        ]},
    ]
  },
  {
    label:"USA",
    value:"1",
    children:[
      {label:"USA1",value:"U1",
        children:[
          {label:"USA1",value:"U11"},
          {label:"CC",value:"U12"},
          {label:"CC",value:"U13"}
        ]},
      {label:"USA2",value:"U2",
        children:[
          {label:"USA2",value:"U21"},
          {label:"CC1",value:"U22"},
          {label:"CC1",value:"U23"}
        ]},
      {label:"USA3",value:"U3",
        children:[
          {label:"USA3",value:"U31"},
          {label:"CC1",value:"U32"},
          {label:"CC1",value:"U33"}
        ]},
      {label:"USA4",value:"U4",
        children:[
          {label:"USA4",value:"U41"},
          {label:"CC1",value:"U42"},
          {label:"CC1",value:"U43"}
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

    Fetch("http://localhost:8000/users?page=1",{})
    .then((data)=>{

    }).catch((e)=>{
      
    });
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
            <Picker cascadeCount={3} datasource={selectorData}/>
            <Space style={StyleSheet.create({height:40})}/>
            <Picker datasource={selectorData}/>
         </ScrollView>
      </View>
    );
  }
}

