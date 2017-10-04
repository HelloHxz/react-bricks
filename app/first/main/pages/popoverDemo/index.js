import {View,Text,React,StyleSheet,PageView,Button,UIManager} from "react-bricks";
import PopoverStore from './store';
import DemoPopover from './components/popover'



@PageView({popoverStore:new PopoverStore})
export default class PopoverDemo extends React.Component {
	
  static navigationOptions = {
    title: 'PopoverDemo',
  };

  componentDidMount() {
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
      <View style={{flex:1}}>
         <Button onPress={this.Show.bind(this)}>Go</Button>
         <DemoPopover popoverStore={this.props.popoverStore}/>
      </View>
    );
  }
}

