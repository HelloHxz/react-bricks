import {View,Text,observer,React,StyleSheet,PageView,Tabs,ScrollView,Button,Image,Theme,Header,TouchableOpacity,Icon,Menu,Space} from "react-bricks"


@observer
export default class TabCom extends React.Component {

  componentDidMount() {
  }

  tabGetIndicatorStyle(params){
    return {
      inner:StyleSheet.create({
        backgroundColor:"orange",
        width:50,
        borderRadius:2,
        left:42
      }),
      wrapper:{
      }
    }
  }

  tabsRenderItem(params){
    var textStyle = params.selected?{color:'orange'}:{};
    return <Text style={textStyle}>{params.itemData.text}</Text>;
  }
  tabsChange(params){
    this.props.messageStore.tabSelectedKey = params.selectedData.key;
  }


  render() {
    return ( <View
                style={StyleSheet.create({alignItems:"center",backgroundColor:"#fff",borderBottom:"1px solid #bbb"})}
            ><Tabs 
              data={[
                {key:"1",text:"视频"},
                {key:"2",text:"头条"},
                {key:"3",text:"榜单"},
                {key:"4",text:"深圳"}
              ]}
              getIndicatorStyle={this.tabGetIndicatorStyle.bind(this)}
              style={StyleSheet.create({width:540})}
              itemStyle={{}}
              renderItem={this.tabsRenderItem.bind(this)}
              selectedKey={this.props.messageStore.tabSelectedKey} 
              onChange={this.tabsChange.bind(this)}>
            </Tabs></View>
    );
  }
}

