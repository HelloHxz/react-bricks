import React from 'react';
import View from '../view'
import TouchableOpacity from '../touchableopacity'


class Segment extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedKey:props.selectedKey,
      selectedIndex:props.selectedIndex,
      renderKey:0,
      offset:0
    }

  }

  componentDidMount(){

  }

  itemClick(key,itemInstance){
    // if(this.props.onItemClickChange){
    //   if(this.props.onItemClickChange({
    //     nextKey:key,
    //     selectedKey:this.state.selectedKey,

    //     itemInstance:itemInstance,
    //     segmentInstance:this
    //   })===false){
    //     return;
    //   }
    // }
     this.props.onChange&&this.props.onChange({
        preSelectedKey:this.state.selectedKey,
        selectedKey:key,
        itemInstance:itemInstance,
        selectedIndex:itemInstance.props.index,  
        segmentInstance:this
      })
  }

  render() {
    var scroll = this.props.scroll === true;
    var itemCount = 0;
    var children = React.Children.map(this.props.children, 
      (child,index) => {
        if(child.type&&typeof(child.type)!=="string"){
          itemCount+=1;
          return React.cloneElement(child, {
            scroll:this.props.scroll,
            itemKey:child.key,
            index:index,
            parent:this,
            selectedKey:this.state.selectedKey,
            selectedIndex:this.state.selectedIndex,
            itemClick:this.itemClick.bind(this)
          });
        }else{
          return child;
        }
      });
    if(this.itemCount===0){
      this.itemCount = itemCount;
    }
    return (<View style={{flexDirection:"row",height:44}}>{children}</View>);
  }
}

class SegmentItem extends React.Component {

  onItemClick(){
    this.props.itemClick&&this.props.itemClick(this.props.itemKey,this);
  }

  render() {
    var scroll = this.props.scroll === true;
    var isSelected = false;

    if(this.props.selectedIndex===0||this.props.selectedIndex){
      //selectedIndex优先级高
      if(this.props.selectedIndex===this.props.index){
        isSelected = true;
      }
    }else{
      if(this.props.selectedKey === this.props.itemKey){
        isSelected = true;
      }
    }

    var children = React.Children.map(this.props.children, 
      (child) => {
        if(child.type&&typeof(child.type)!=="string"){
          return React.cloneElement(child, {
            ...this.props,
            ...{
              selected:isSelected
            }
          });
        }else{
          return child;
        }
    });
    return (<TouchableOpacity onPress={this.onItemClick.bind(this)} activeOpacity={1} style={{flex:1,justifyContent:"center",alignItems:"center"}}>{children}</TouchableOpacity>);
  }
}


Segment.Item = SegmentItem;

export default Segment;