import React from 'react';
import StyleSheet from '../style';
import View from '../view';
import ScrollView from '../scrollview'
import Theme from '../theme';
import TouchableHighlight from '../touchablehighlight'


var defaultStyle = StyleSheet.create({
  wrapper:{
    height:100,
    width:"100%",
    flexDirection:"row"
  },
  item:{
    flex:1,
  }
});
export default class Tabs extends React.Component {
  constructor(props){
    super(props);
    var size = props.size || "default";
    if(["lg","sm"].indexOf(size)<0){
      size = "default";
    }
    this.tabs_selected_backgroundcolor =props.selectedBackgroundColor||Theme.tabs_selected_backgroundcolor;
    this.wrapperStyle = {
      height:StyleSheet.px(Theme["tabs_"+size+"_height"]),
    }
   
    this.wrapperStyle = {...defaultStyle.wrapper,...this.wrapperStyle,
    	...props.style||{},
    	...props.scroll?{overflow:"scroll"}:{}};
    var selectedKey = props.selectedKey;
	if(!selectedKey&&props.data.length>0){
		selectedKey = props.data[0].key;
	}
	this.state = {
		data:props.data||[],
		selectedKey:selectedKey,
	}

  }

  componentWillReceiveProps(nextProps){

   if(nextProps.selectedIndex===0||nextProps.selectedIndex){
    //selectedIndex 优先
    if(this.state.selectedIndex!==nextProps.selectedIndex){
      this.setState({
        selectedIndex:nextProps.selectedIndex
      });
    }
   } else{
    if(this.state.selectedKey!==nextProps.selectedKey){
      this.setState({
        selectedKey:nextProps.selectedKey
      });
    }
   }
   
  }


  itemPress(itemdata,i,event){
    if(this.props.onChange){
      this.props.onChange({
        selectedData:itemdata,
        preSelectedData:this.preSelectedData,
        selectedIndex:i,
        preSelectedIndex:this.preSelectedIndex,
        sender:this
      });
    }
  }

  render() {
    var child = [];


	var Wrapper = View;
	var propsItemStyle = this.props.itemStyle||{};
	var itemStyle = {};

	if(this.props.scroll){
	  if(StyleSheet.isWeb){

	  }else{
	  	Wrapper = ScrollView;
	  }

	  if(!propsItemStyle.width){
	  	propsItemStyle.width = StyleSheet.px(220);
	  }
	  delete propsItemStyle.flex;

	}else{
		itemStyle.flex = 1;
	}


    for(var i=0,j=this.state.data.length;i<j;i++){
     
      itemdata = this.state.data[i];
      if(!itemdata.key){
        console.error("tabs data属性每项数据需要key字段");
      }
      var selectedStyle = {};
      var selected = false;
   
        if(this.state.selectedKey === itemdata.key){
           selected = true;
           this.preSelectedData = itemdata;
           this.preSelectedIndex = i;
           selectedStyle.backgroundColor = this.tabs_selected_backgroundcolor;
        }

      child.push(<TouchableHighlight 
        underlayColor = {this.props.underlayColor||Theme.tabs_press_underlaycolor}
        onPress = {this.itemPress.bind(this,itemdata,i)}
        key={i+"item"} style={itemStyle}>
          <View style={{...{position:"relative",flexDirection:"column",height:"100%",width:"100%",justifyContent:"center",
    alignItems:"center"},...selectedStyle,...propsItemStyle||{}}}>
              {
                this.props.renderItem && 
                this.props.renderItem({
                  index:i,
                  itemData:itemdata,
                  sender:this,
                  selected:selected
                })
              }
          </View>
        </TouchableHighlight>);
    }


    return (<Wrapper showsHorizontalScrollIndicator={false} scrollEnabled={true} horizontal={true} style={this.wrapperStyle }>
      {child}
      </Wrapper>);
  }
}

