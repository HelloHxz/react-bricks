import {View,Text,React,Button,Theme,StyleSheet,PageView,PageContainer,SlideModal} from "react-bricks"
import Store from './store'
import Tabbar from './components/tabbar'
import HomeDropGroup from './components/homeDropGroup'
import MidlePage from './components/midPageModal'


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

  onPageBeforeLeave(params){
    if(params.action==="后退"){
      if(this.popPageKey){
        this.hideMidPage();
        return false;
      }
      return true;
    }
  }

  hideMidPage(){
    this.props.hidePopPage(this.popPageKey);
    this.popPageKey = null;
  }
  showMidPage(e){
    this.popPageKey = this.props.popPage(<MidlePage hideMidPage={this.hideMidPage.bind(this)}/>,{
      animate:false
    });
  }

 
  componentDidMount() {
  }

  render() {
    return (
      <View style={{flex:1,backgroundColor:Theme.theme_background_color}}>
          <HomeDropGroup rootStore={this.props.rootStore}/>
          <PageContainer {...this.props} owner={this}/>
          <Tabbar 
          showMidPage={this.showMidPage.bind(this)}
          navigation={this.props.navigation}
          rootStore = {this.props.rootStore}/>
      </View>
    );
  }
}

export default RootPage;

