import {View,observer,Text,React,StyleSheet,PageView,ScrollView,Button,Swiper,Image,Header,TouchableOpacity,Icon,Grid,Space,Segment,Container} from "react-bricks"
import GuanZhuPage from '../pages/guanzhu'
import HotPage from '../pages/hot'


@observer
class BottomContainer extends React.Component {
	
  componentDidMount() {
  }

  renderContainerItem(params){
    if(params.data.key==='guanzhu'){
      return <GuanZhuPage navigation={this.props.navigation}/>
    }else if(params.data.key==='hot'){
      return <HotPage navigation={this.props.navigation}/>
    }
  }

  render() {
    return (
        <Container 
          selectedKey={this.props.homeStore.tabSelectedKey} 
          renderItem={this.renderContainerItem.bind(this)}
          data={this.props.data}/>
    );
  }
}

export default BottomContainer;

