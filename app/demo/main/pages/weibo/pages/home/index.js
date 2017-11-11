import {View,Text,React,Button,Theme,StyleSheet,UIManager,PageView,PageContainer,Header,TouchableOpacity,Icon} from "react-bricks"
import Store from './store'
import HomePopover from './components/popover'
import Tabbar from './components/tabbar'

@PageView
class HomePage extends React.Component {

  static connectStore(){
    return {
      homeStore:new Store
    }
  }


  componentDidMount() {
  }

  showPopover(e){
    UIManager.measure(e.currentTarget,(rect)=>{
       this.props.homeStore.popoverConfig = {rect:rect,direction:"bottom"}
    })
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
         <HomePopover homeStore={this.props.homeStore}/>
         <Header style={StyleSheet.create({justifyContent:"space-between"})}>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",marginLeft:10,justifyContent:"center",alignItems:"center"})}><
              Icon style={{color:"blue"}} icon={Icon.DemoIcons.search}/></TouchableOpacity>
            <Tabbar homeStore={this.props.homeStore}/>
            <TouchableOpacity 
              onPress = {this.showPopover.bind(this)}
              style={StyleSheet.create({width:60,height:"100%",marginRight:10,justifyContent:"center",alignItems:"center"})}><
              Icon style={{color:"blue"}} icon={Icon.DemoIcons.saoyisao}/></TouchableOpacity>
        </Header>
      </View>
    );
  }
}

export default HomePage;

