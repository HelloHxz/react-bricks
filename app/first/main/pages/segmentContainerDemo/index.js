import {View,Text,React,StyleSheet,PageView,ScrollView,Button,Swiper,Image,Header,TouchableOpacity,Icon,Grid,Space,Segment,Container} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';

@PageView({rootStore:null,homeStore:null})
export default class GridDemo extends React.Component {
	
  static navigationOptions = {
    header:null
  };

  componentDidMount() {
  }

  renderContainerItem(params){
    return <Text>ss</Text>
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
        <Segment data={[{key:"1"},{key:"2"},{key:"3"}]}/>
        <Container 
          renderItem={this.renderContainerItem.bind(this)}
          data={[{key:"1"},{key:"2"},{key:"3"}]}/>
      </View>
    );
  }
}

