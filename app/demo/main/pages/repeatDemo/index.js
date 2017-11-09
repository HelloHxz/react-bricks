import {View,Text,React,StyleSheet,PageView,ScrollView,Button,Image,Header,TouchableOpacity,Icon,Repeat,Space} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';




@PageView
export default class RepeatDemo extends React.Component {
	
  static navigationOptions = {
    header:null
  };

  componentDidMount() {
  }


  goBack(){
    this.props.navigation.goBack();
  }

  render() {
    return (
       <View style={{flex:1,backgroundColor:"#f2f3f4"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={svgs.left}/></TouchableOpacity>
        </Header>
        <ScrollView style={{flex:1}}>
        <Space/>
          <Repeat>
            <Repeat.Item>
            </Repeat.Item>
            <Repeat.Item>
            </Repeat.Item>
            <Repeat.Item>
            </Repeat.Item>
             <Repeat.Item>
            </Repeat.Item>
             <Repeat.Item>
            </Repeat.Item>
            <Repeat.Space>
            </Repeat.Space>
             <Repeat.Item>
            </Repeat.Item>
             <Repeat.Item>
            </Repeat.Item>
            <Repeat.Item>
            </Repeat.Item>
            <Repeat.Space>
            </Repeat.Space>
             <Repeat.Item>
            </Repeat.Item>
          </Repeat>
        </ScrollView>
      </View>
    );
  }
}

