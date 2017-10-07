import {View,Text,React,StyleSheet,PageView,Button,UIManager,Header,TouchableOpacity,Icon} from "react-bricks";
import PopoverStore from './store';
import DemoPopover from './components/popover'
import svgs from '../../assets/svg/svgs.js';



@PageView({popoverStore:new PopoverStore})
export default class PopoverDemo extends React.Component {
	
  static navigationOptions = {
    header:null
  };

  componentDidMount() {
  }

  goBack(){
    this.props.navigation.goBack();
  }

  Show(e){
      UIManager.measure(e.currentTarget,(x, y, width, height, left, top)=>{
       this.props.popoverStore.popoverConfig = {rect:{
        x:x,
        y:y,
        width:width,
        height:height
       },dirction:"top"}
    })
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:"#fff",overflow:"hidden"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon style={{color:"blue"}} icon={svgs.left}/></TouchableOpacity>
        </Header>
         <Button onPress={this.Show.bind(this)}>Go</Button>
         <DemoPopover popoverStore={this.props.popoverStore}/>
      </View>
    );
  }
}

