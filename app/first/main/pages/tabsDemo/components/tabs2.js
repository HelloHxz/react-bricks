import {View,Text,observer,React,StyleSheet,PageView,Tabs,ScrollView,Button,Image,Theme,Header,TouchableOpacity,Icon,Menu,Space} from "react-bricks"
import svgs from '../../../assets/svg/svgs.js';


@observer
export default class Tabs2 extends React.Component {
	
  static navigationOptions = {
    header:null
  };

  componentDidMount() {
  }


  goBack(){
    this.props.navigation.goBack();
  }

   tabsRenderItem2(params){
    var textStyle = params.selected?{color:"orange"}:{};
    return <Text style={textStyle}>{params.itemData.text}</Text>;
  }
  segChange2(params){
    this.props.tabsDemoStore.tabSelectedKey2 = params.selectedData.key;
  }



  render() {
    return (<Tabs 
              data={[
                {key:"1",text:"全部",icon:svgs.home},
                {key:"2",text:"未付款",icon:svgs.search},
                {key:"3",text:"已发货",icon:svgs.search},
                {key:"4",text:"已收货",icon:svgs.search},
                {key:"5",text:"退货",icon:svgs.search}
              ]}
              itemStyle={{}}
              scroll={true}
              renderItem={this.tabsRenderItem2.bind(this)}
              selectedKey={this.props.tabsDemoStore.tabSelectedKey2} 
              onChange={this.segChange2.bind(this)}>
            </Tabs>
    );
  }
}

