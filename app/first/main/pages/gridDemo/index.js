import {View,Text,React,StyleSheet,PageView,ScrollView,Button,Image,Header,TouchableOpacity,Icon,Grid,Space} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';




@PageView({rootStore:null,homeStore:null})
export default class GridDemo extends React.Component {
	
  static navigationOptions = {
    header:null
  };

  componentDidMount() {
  }


  goBack(){
    this.props.navigation.goBack();
  }

  renderItem(params){
    return [<Icon key='1' icon={svgs.home}/>,<Text key='2'>{params.index}</Text>]
  }

  render() {
    return (
       <View style={{flex:1,backgroundColor:"#f2f3f4"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={svgs.left}/></TouchableOpacity>
        </Header>
        <ScrollView style={{flex:1}}>
        <Space/>
          <Grid data={[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]} column={4} renderItem={this.renderItem.bind(this)}/>
        </ScrollView>
      </View>
    );
  }
}
