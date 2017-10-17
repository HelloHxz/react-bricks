import {View,Text,observer,React,StyleSheet,PageView,Tabs,ScrollView,Button,Image,Theme,Header,TouchableOpacity,Icon,Menu,Space} from "react-bricks"
import svgs from '../../../assets/svg/svgs.js';


@observer
export default class TabCom extends React.Component {
	

  componentDidMount() {
  }



  tabsRenderItem1(params){
    var textStyle = params.selected?{color:Theme.theme_color}:{};
    return <Text style={textStyle}>{params.itemData.text}</Text>;
  }
  segChange1(params){
    this.props.tabsDemoStore.tabSelectedKey1 = params.selectedData.key;
  }


  render() {
    return ( <Tabs 
              data={[
                {key:"1",text:"待发货",icon:svgs.home},
                {key:"2",text:"已发货",icon:svgs.search},
                {key:"3",text:"已收货",icon:svgs.search}
              ]}
              itemStyle={{}}
              renderItem={this.tabsRenderItem1.bind(this)}
              selectedKey={this.props.tabsDemoStore.tabSelectedKey1} 
              onChange={this.segChange1.bind(this)}>
            </Tabs>
    );
  }
}

