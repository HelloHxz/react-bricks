import {View,Text,React,StyleSheet,PageView,Button,UIManager,Header,TouchableOpacity,Icon} from "react-bricks";
import PoplayerStore from './store';
import DemoPoplayer from './components/demoPoplayer'
import svgs from '../../assets/svg/svgs.js';



@PageView
export default class PoplayerDemo extends React.Component {
	
  static navigationOptions = {
    header:null
  };
  static connectStore(){
    return {poplayerDemoStore:new PoplayerStore};
  }

  componentDidMount() {
  }

  goBack(){
    this.props.navigation.goBack();
  }


  Show(e){
     this.props.poplayerDemoStore.popLayerConfig = {key:"some",dirction:"top"}
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={svgs.left}/></TouchableOpacity>
        </Header>
         <Button onPress={this.Show.bind(this)}>Go</Button>
         <DemoPoplayer poplayerDemoStore={this.props.poplayerDemoStore}/>
      </View>
    );
  }
}

