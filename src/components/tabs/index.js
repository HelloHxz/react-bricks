import React from 'react';
import StyleSheet from '../style';
import View from '../view';
import Theme from '../theme';
import TouchableHighlight from '../touchablehighlight'


var defaultStyle = StyleSheet.create({
  wrapper:{
    flexDirection:"row",
    height:100,
    overflow:"hidden"
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
   
    this.wrapperStyle = {...defaultStyle.wrapper,...this.wrapperStyle,...this.props.style||{}};
      var selectedIndex = props.selectedIndex;
      if(!props.selectedKey&&!props.selectedIndex){
        selectedIndex = 0;
      }
      this.state = {
        data:props.data||[],
        selectedKey:props.selectedKey,
        selectedIndex:selectedIndex
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
    if(this.state.selectedKey&&this.state.selectedKey!==nextProps.selectedKey){
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

    for(var i=0,j=this.state.data.length;i<j;i++){
     
      itemdata = this.state.data[i];
      if(!itemdata.key){
        console.error("tabs data属性每项数据需要key字段");
      }
      var selectedStyle = {};
      var selected = false;
      if(this.state.selectedIndex===0||this.state.selectedIndex){
        //selectedIndex优先级高
        if(this.state.selectedIndex===i){
          selected = true;
          this.preSelectedData = itemdata;
          this.preSelectedIndex = i;
          selectedStyle.backgroundColor = this.tabs_selected_backgroundcolor;
        }
      }else{
        if(this.state.selectedKey === itemdata.key){
           selected = true;
           this.preSelectedData = itemdata;
           this.preSelectedIndex = i;
           selectedStyle.backgroundColor = this.tabs_selected_backgroundcolor;
        }
      }

      child.push(<TouchableHighlight 
        underlayColor = {this.props.underlayColor||Theme.tabs_press_underlaycolor}
        onPress = {this.itemPress.bind(this,itemdata,i)}
        key={i+"item"} style={{...defaultStyle.item}}>
          <View style={{...{position:"relative",flexDirection:"column",height:"100%",width:"100%",justifyContent:"center",
    alignItems:"center"},...selectedStyle,...this.props.itemStyle||{}}}>
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
    return (<View style={this.wrapperStyle }>
      {child}
      </View>);
  }
}

