import {View,observer,Text,React,StyleSheet,PageView,ScrollView,Button,Swiper,Image,Header,TouchableOpacity,Icon,Grid,Space,Segment} from "react-bricks"
import svgs from '../../assets/svg/svgs.js';
import SegmentContainerStore from './store';
import BottomContainer from './components/BottomContainer'
import TopSegment from './components/TopSegment'


const segmentData = [{key:"1",name:"全部"},{key:"2",name:"完成"},{key:"3",name:"未完成"}];

@PageView({curpagestore:new SegmentContainerStore})
export default class SegmentContainerDemo extends React.Component {
	
  static navigationOptions = {
    header:null
  };

  componentDidMount() {
  }

  renderContainerItem(params){
    return <Text>ss{params.index}</Text>
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


  goBack(){
    this.props.navigation.goBack();
  }


  render() {
    return (
       <View style={{flex:1,backgroundColor:"#f2f3f4"}}>
        <Header>
            <TouchableOpacity style={StyleSheet.create({width:60,height:"100%",justifyContent:"center",alignItems:"center"})} onPress={this.goBack.bind(this)}><Icon icon={svgs.left}/></TouchableOpacity>
        </Header>
        <TopSegment 
            curpagestore={this.props.curpagestore}
            data={segmentData}/>
        <BottomContainer 
          curpagestore={this.props.curpagestore}
          data={segmentData}/>
      </View>
    );
  }
}


