import {View,Icon,Text,React,StyleSheet,PageView,Button,Header,TouchableOpacity} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';

@PageView({rootStore:null,homeStore:null})
class IconDemo extends React.Component {
	
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
        <Icon icon={svgs.saoyisao} size='lg'/>
        <Icon icon={svgs.search}/>
        <Icon icon={svgs.home} size='sm'/>

        <Icon icon={svgs.saoyisao} type='primary' size='lg'/>

        <Icon icon={svgs.saoyisao} type='primary' circle={true} size='lg'/>


        <Icon icon={svgs.search} type='primary'/>

        <Icon icon={svgs.home} size='sm' circle={true}  type='primary'/>



        <Icon icon={svgs.search} type='hollow'/>

        <Icon icon={svgs.home} size='sm' circle={true} type='hollow'/>



        <Icon icon={svgs.home} size='sm' style={StyleSheet.create({width:100,fontSize:50})} circle={true} type='hollow'/>

      </View>
    );
  }
}

export default IconDemo;