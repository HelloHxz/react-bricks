import {View,Text,React,Button,Theme,StyleSheet,PageView,PageContainer,SlideModal} from "react-bricks"
import Store from './store'
import Tabbar from './components/tabbar'
import MidlePageModal from './components/midPageModal';
import HomeDropGroup from './components/homeDropGroup'

@PageView
class RootPage extends React.Component {
	
  static connectStore(){
    return {
      rootStore:Store
    }
  }

  constructor(props){
    super(props);
    props.navigation.listenRouteChange(this,(params)=>{
      if(this.props.rootStore.tabSelectedKey!==params.tabPath){
        this.props.rootStore.tabSelectedKey = params.tabPath;
      }
    });
  }

 
  componentDidMount() {
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
          <HomeDropGroup rootStore={this.props.rootStore}/>
          <MidlePageModal rootStore={this.props.rootStore}/>
          <PageContainer {...this.props} owner={this}/>
          <Tabbar 
          navigation={this.props.navigation}
          rootStore = {this.props.rootStore}/>
      </View>
    );
  }
}

export default RootPage;

