import {View,observer,Text,React,StyleSheet,PageView,ScrollView,Button,Swiper,Image,Header,TouchableOpacity,Icon,Grid,Space,Segment,Container} from "react-bricks"
import GuanZhuPage from '../pages/guanzhu'
import HotPage from '../pages/hot'


@observer
class BottomContainer extends React.Component {
	
  componentDidMount() {
  }

  renderContainerItem(params){
    if(params.data.key==='guanzhu'){
      return <GuanZhuPage/>
    }else if(params.data.key==='hot'){
      return <HotPage/>
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

