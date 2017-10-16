import {View,Text,observer,React,StyleSheet,PageView,Tabs,ScrollView,Button,Image,Header,TouchableOpacity,Icon,Menu,Space} from "react-bricks"
import svgs from '../../../assets/svg/svgs.js';


@observer
export default class TabCom extends React.Component {
	

  componentDidMount() {
  }



  tabsRenderItem1(params){
    var textStyle = params.selected?{color:"red"}:{};
    return <Text style={textStyle}>a</Text>;
  }
  segChange1(params){
    this.props.tabsDemoStore.tabSelectedKey1 = params.selectedData.key;
  }


  render() {
    return ( <Tabs 
              data={[
                {key:"1",text:"Setting",icon:svgs.home},
                {key:"2",text:"my",icon:svgs.search},
                {key:"3",text:"app",icon:svgs.search}
              ]}
              itemStyle={{}}
              renderItem={this.tabsRenderItem1.bind(this)}
              selectedKey={this.props.tabsDemoStore.tabSelectedKey1} 
              onChange={this.segChange1.bind(this)}>
            </Tabs>
    );
  }
}

