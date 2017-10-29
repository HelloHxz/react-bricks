import {View,Text,React,StyleSheet,PageView,Button,Image,Header,TouchableOpacity,Icon} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';


const imgurl = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1506942039759&di=c09b7da92055a60c4b1cc3f4aad27a61&imgtype=0&src=http%3A%2F%2Fpic7.nipic.com%2F20100504%2F2425919_150716548243_2.jpg";


@PageView
export default class IconDemo extends React.Component {
	
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
       <View style={{flex:1,backgroundColor:"#fff"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={svgs.left}/></TouchableOpacity>
        </Header>
        <Image
          style={StyleSheet.create({width:100,height:100})}
          source={require('../../assets/imgs/1.jpeg')}
        />
        <Text>asdas</Text>
        <Image
          resizeMode='contain'
           style={StyleSheet.create({width:200,height:200})}
          source={{uri:imgurl}}
        />
      </View>
    );
  }
}

