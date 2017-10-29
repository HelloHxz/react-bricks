import {View,observer,Text,React,StyleSheet,PageView,ScrollView,Button,Swiper,Image,Header,TouchableOpacity,Icon,Grid,Space,Segment} from "react-bricks"
import svgs from '../../../assets/svg/svgs.js';


@observer
class SegmentContainerDemo extends React.Component {
  

  componentDidMount() {
  }
  renderSegmentItem(params){
      var style = {color:"#333"}
      if(params.selected){
        style.color = "#fff";
      }
     return <Text style={style}>{params.itemData.name}</Text>
  }

  segmentOnChange(params){
    this.props.curpagestore.segmentSelectedKey = params.selectedData.key;
  }

  render() {
    return (
        <Segment 
            style={StyleSheet.create({width:400})}
            onChange={this.segmentOnChange.bind(this)}
            renderItem = {this.renderSegmentItem.bind(this)}
            selectedKey={this.props.curpagestore.segmentSelectedKey} 
            data={this.props.data}/>
    );
  }
}

export default SegmentContainerDemo;

