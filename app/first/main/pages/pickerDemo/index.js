import {View,Text,React,StyleSheet,observer,PageView,TextInput,Button,UIManager,ScrollView,Header,TouchableOpacity,Icon,Theme,Space,Picker} from "react-bricks";
import PickerDemoStore from './store';
import svgs from '../../assets/svg/svgs.js';


var selectorData=[[
  {
    label:"China",
    value:"0",
    children:[
      {label:"Cf2",value:"2",
        children:[
          {label:"CC",value:"2"},
          {label:"CC",value:"2"},
          {label:"CC",value:"2"}
        ]
      },
      {label:"C4",value:"2",
        children:[
          {label:"CC2",value:"2"},
          {label:"CC3",value:"2"},
          {label:"CC1",value:"2"}
        ]},
      {label:"Cs",value:"2",
        children:[
          {label:"CC2",value:"2"},
          {label:"CC4",value:"2"},
          {label:"CC5",value:"2"}
        ]},
      {label:"Cds",value:"2",
        children:[
          {label:"CC6",value:"2"},
          {label:"CC3",value:"2"},
          {label:"CC",value:"2"}
        ]},
    ]
  },
  {
    label:"USA",
    value:"1",
    children:[
      {label:"USA1",value:"2",
        children:[
          {label:"USA1",value:"2"},
          {label:"CC",value:"2"},
          {label:"CC",value:"2"}
        ]},
      {label:"USA2",value:"2",
        children:[
          {label:"USA2",value:"2"},
          {label:"CC1",value:"2"},
          {label:"CC1",value:"2"}
        ]},
      {label:"USA3",value:"2",
        children:[
          {label:"USA3",value:"2"},
          {label:"CC1",value:"2"},
          {label:"CC1",value:"2"}
        ]},
      {label:"USA4",value:"2",
        children:[
          {label:"USA4",value:"2"},
          {label:"CC1",value:"2"},
          {label:"CC1",value:"2"}
        ]},
    ]
  }

],[
  {
    label:"xxx",
    value:"xxx"
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
            <Picker datasource={selectorData}/>
         </ScrollView>
      </View>
    );
  }
}

