import {View,observer,Text,React,StyleSheet,PageView,ScrollView,Button,Swiper,Image,Header,TouchableOpacity,Icon,Grid,Space,Segment,Container} from "react-bricks"
import svgs from '../../../assets/svg/svgs.js';


@observer
class BottomContainer extends React.Component {
	
  componentDidMount() {
  }

  renderContainerItem(params){
    return <Text>ss{params.index}</Text>
  }

  render() {
    return (
        <Container 
          selectedKey={this.props.curpagestore.segmentSelectedKey} 
          renderItem={this.renderContainerItem.bind(this)}
          data={this.props.data}/>
    );
  }
}

export default BottomContainer;

