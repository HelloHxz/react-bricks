import {View,Text,React,StyleSheet,PageView,Button,UIManager} from "react-bricks";
import PoplayerStore from './store';
import DemoPoplayer from './components/demoPoplayer'



@PageView({poplayerDemoStore:new PoplayerStore})
export default class PoplayerDemo extends React.Component {
	
  static navigationOptions = {
    title: 'PoplayerDemo',
  };

  componentDidMount() {
  }

  Show(e){
     this.props.poplayerDemoStore.popLayerConfig = {key:"some",dirction:"top"}
  }

  render() {
    return (
      <View style={{flex:1}}>
         <Button onPress={this.Show.bind(this)}>Go</Button>
         <DemoPoplayer poplayerDemoStore={this.props.poplayerDemoStore}/>
      </View>
    );
  }
}

