import {View,Text,observer,React,StyleSheet,PageView,Tabs,ScrollView,Button,Image,Header,TouchableOpacity,Icon,Menu,Space} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';
import TabsDemoStore from './store';
import Tabs1 from './components/tabs1'
import Tabs2 from './components/tabs2'

@PageView({rootStore:null,tabsDemoStore:new TabsDemoStore})
export default class TabsDemo extends React.Component {
	
  static connectStore(){
    return {rootStore:null,tabsDemoStore:new TabsDemoStore};
  }
  static navigationOptions = {
    header:null
  };

  componentDidMount() {
  }


  goBack(){
    this.props.navigation.goBack();
  }

  tabsRenderItem1(params){
    var textStyle = params.selected?{color:"red"}:{};
    return <Text style={textStyle}>a</Text>;
  }
  segChange1(){

  }

   tabsRenderItem2(params){
    var textStyle = params.selected?{color:"orange"}:{};
    return <Text style={textStyle}>{params.itemData.text}</Text>;
  }
  segChange2(params){
    this.props.tabsDemoStore.tabSelectedKey2 = params.selectedData.key;
  }



  render() {
    return (
       <View style={{flex:1,backgroundColor:"#f2f3f4"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={svgs.left}/></TouchableOpacity>
        </Header>
        <ScrollView style={{flex:1}}>
            <Space/>
              <Tabs1 
              tabsDemoStore={this.props.tabsDemoStore}/>
 <Space/>
            <Tabs2 
             tabsDemoStore={this.props.tabsDemoStore}>
            </Tabs2>

        </ScrollView>
      </View>
    );
  }
}

