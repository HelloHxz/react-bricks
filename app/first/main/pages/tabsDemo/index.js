import {View,Text,React,StyleSheet,PageView,Tabs,ScrollView,Button,Image,Header,TouchableOpacity,Icon,Menu,Space} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';
import TabsDemoStore from './store'


@PageView({rootStore:null,tabsDemoStore:new TabsDemoStore})
export default class TabsDemo extends React.Component {
	
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
    var textStyle = params.selected?{color:"red"}:{};
    return <Text style={textStyle}>a</Text>;
  }
  segChange2(){

  }



  render() {
    return (
       <View style={{flex:1,backgroundColor:"#f2f3f4"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={svgs.left}/></TouchableOpacity>
        </Header>
        <ScrollView style={{flex:1}}>
            <Space/>
              <Tabs 
              data={[
                {key:"1",text:"Setting",icon:svgs.home},
                {key:"2",text:"my",icon:svgs.search},
                {key:"3",text:"app",icon:svgs.search}
              ]}
              itemStyle={{}}
              renderItem={this.tabsRenderItem1.bind(this)}
              selectedKey={this.props.tabsDemoStore.tabSelectedKey1} 
              onChange={this.segChange1.bind(this)}>
            </Tabs>

 <Space/>
            <Tabs 
              data={[
                {key:"1",text:"Setting",icon:svgs.home},
                {key:"2",text:"my",icon:svgs.search},
                {key:"3",text:"app",icon:svgs.search},
                {key:"4",text:"app",icon:svgs.search},
                {key:"5",text:"app",icon:svgs.search}
              ]}
              itemStyle={{}}
              scroll={true}
              renderItem={this.tabsRenderItem2.bind(this)}
              selectedKey={this.props.tabsDemoStore.tabSelectedKey2} 
              onChange={this.segChange2.bind(this)}>
            </Tabs>

        </ScrollView>
      </View>
    );
  }
}

