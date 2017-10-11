import {View,Text,React,StyleSheet,PageView,ScrollView,Button,Image,Header,TouchableOpacity,Icon,Menu,Space} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';




@PageView({rootStore:null,homeStore:null})
export default class MenuDemo extends React.Component {
	
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
          <Menu>
            <Menu.Item>
            </Menu.Item>
            <Menu.Item>
            </Menu.Item>
            <Menu.Item>
            </Menu.Item>
             <Menu.Item>
            </Menu.Item>
             <Menu.Item>
            </Menu.Item>
            <Menu.Space>
            </Menu.Space>
             <Menu.Item>
            </Menu.Item>
             <Menu.Item>
            </Menu.Item>
            <Menu.Item>
            </Menu.Item>
            <Menu.Space>
            </Menu.Space>
             <Menu.Item>
            </Menu.Item>
          </Menu>
        </ScrollView>
      </View>
    );
  }
}

