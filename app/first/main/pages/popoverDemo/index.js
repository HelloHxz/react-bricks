import {View,Text,React,StyleSheet,PageView,Button,UIManager,ScrollView,Header,TouchableOpacity,Icon,Theme,Space} from "react-bricks";
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

  Show(d,e){
      UIManager.measure(e.currentTarget,(x, y, width, height, left, top)=>{
       this.props.popoverStore.popoverConfig = {rect:{
        left:left,
        top:top,
        width:width,
        height:height
       },dirction:"top"}
    })
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon style={{color:"blue"}} icon={svgs.left}/></TouchableOpacity>
        </Header>
        <ScrollView style={StyleSheet.create({flex:1,paddingLeft:40,paddingRight:40})}>
            <Space style={StyleSheet.create({height:40})}/>
            <View style={{justifyContent:"space-between",flexDirection:"row"}}>
                <Button onPress={this.Show.bind(this,'LT')} type='primary' circle={true} size='sm'>LT</Button>
                <Button onPress={this.Show.bind(this,'MT')} type='primary' circle={true} size='sm'>MT</Button>
                <Button onPress={this.Show.bind(this,'RT')} type='primary' circle={true} size='sm'>RT</Button>
            </View>
            <Space style={StyleSheet.create({height:450})}/>
             <View style={{justifyContent:"space-between",flexDirection:"row"}}>
                <Button onPress={this.Show.bind(this,'LM')} type='primary' circle={true} size='sm'>LM</Button>
                <Button onPress={this.Show.bind(this,'MM')} type='primary' circle={true} size='sm'>MM</Button>
                <Button onPress={this.Show.bind(this,'RM')} type='primary' circle={true} size='sm'>RM</Button>
            </View>
            <Space style={StyleSheet.create({height:450})}/>
             <View style={{justifyContent:"space-between",flexDirection:"row"}}>
                <Button onPress={this.Show.bind(this,'LB')} type='primary' circle={true} size='sm'>LB</Button>
                <Button onPress={this.Show.bind(this,'MB')} type='primary' circle={true} size='sm'>MB</Button>
                <Button onPress={this.Show.bind(this,'RB')} type='primary' circle={true} size='sm'>RB</Button>
            </View>
         </ScrollView>
         <DemoPopover popoverStore={this.props.popoverStore}/>
      </View>
    );
  }
}

