import {View,Text,React,Button,Theme,StyleSheet,PageView,PageContainer} from "react-bricks"
import Store from './store'
import svgs from '../../../../assets/svg/svgs.js';
import Tabbar from './components/tabbar'

@PageView
class RootPage extends React.Component {
	
  static connectStore(){
    return {
      rootStore:new Store
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
          <PageContainer {...this.props} owner={this}/>
          <Tabbar 
          navigation={this.props.navigation}
          rootStore = {this.props.rootStore}/>
      </View>
    );
  }
}

export default RootPage;

