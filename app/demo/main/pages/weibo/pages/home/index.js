import {View,Text,React,Button,Theme,StyleSheet,UIManager,PageView,PageContainer,Header,TouchableOpacity,Icon} from "react-bricks"
import Store from './store'
import HomePopover from './components/popover'
import Tabbar from './components/tabbar'
import HomeContainer from './components/conatiner'


const tabData = [
            {key:"guanzhu",text:"关注",icon:Icon.DemoIcons.home},
            {key:"hot",text:"热门",icon:Icon.DemoIcons.search}
          ];

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
            <Tabbar homeStore={this.props.homeStore} data={tabData}/>
            <TouchableOpacity 
              onPress = {this.showPopover.bind(this)}
              style={StyleSheet.create({width:60,height:"100%",marginRight:10,justifyContent:"center",alignItems:"center"})}><
              Icon style={{color:"blue"}} icon={Icon.DemoIcons.saoyisao}/></TouchableOpacity>
        </Header>
        <HomeContainer  data={tabData} homeStore={this.props.homeStore}/>
      </View>
    );
  }
}

export default HomePage;

