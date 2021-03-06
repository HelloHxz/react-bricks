import React from 'react';
import StyleSheet from '../style';
import View from '../view';
import ScrollView from '../scrollview'
import Theme from '../theme';
import Animated from '../animated'
import UIManager from '../uimanager'
import TouchableHighlight from '../touchablehighlight'
import LayoutAnimation from '../layoutanimation';
import Easing from '../easing'



var defaultStyle = StyleSheet.create({
  wrapper:{
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

    this.itemsDict=[];
    var size = props.size || "default";
    if(["lg","sm"].indexOf(size)<0){
      size = "default";
    }
    this.tabs_selected_backgroundcolor =props.selectedBackgroundColor||Theme.tabs_selected_backgroundcolor;
    this.wrapperStyle = {
    	position:"relative",
        height:StyleSheet.px(Theme["tabs_"+size+"_height"]),
        backgroundColor:Theme.tabs_backgroundcolor
    }
   
    this.wrapperStyle = {...defaultStyle.wrapper,...this.wrapperStyle,
    	...props.style||{},
    	...props.scroll?{overflow:"scroll"}:{}};
    var selectedKey = props.selectedKey;
	if(!selectedKey&&props.data.length>0){
		selectedKey = props.data[0].key;
	}
	this.itemhasMountCount = 0;
	this.itemWidth = 0;
	var itemsAndOffset = this.getItems(props.data||[],selectedKey,props);
	this.state = {
		data:props.data||[],
		selectedKey:selectedKey,
		renderSeed:0,
		offset:new Animated.Value(itemsAndOffset.offset),
		items:itemsAndOffset.items,
	}

  }


  getItems(data,selectedKey,props){
  	var Re= {};
  	var child = [];
  	for(var i=0,j=data.length;i<j;i++){
		var itemdata = data[i];
		if(!itemdata.key){
			console.error("tabs data属性每项数据需要key字段");
		}
		var selected = false;
		if(selectedKey === itemdata.key){
			selected = true;
			this.preSelectedData = itemdata;
			this.preSelectedIndex = i;
	    }

		child.push(<Item
		parent={this}
		selected={selected}
		itemdata={itemdata}
		index = {i}
		scroll={this.props.scroll}
		measureWidth={this.measureWidth.bind(this)}
		key={itemdata.key}
		itemStyle={props.itemStyle}
		></Item>);
   }
   return {items:child,offset:this.preSelectedIndex*this.itemWidth};
  }

  componentWillReceiveProps(nextProps){
 	var itemsAndOffset = this.getItems(nextProps.data||[],nextProps.selectedKey,nextProps);
  	if(this.props.indicator!==false){
	     setTimeout(()=>{
	     	Animated.spring(
	        this.state.offset,
	        {
	          toValue: itemsAndOffset.offset,
	          duration:190,
	          bounciness: 10, 
	          easing:Easing.inOut(Easing.in)
	        }
	      ).start()
	     },0)
	 }
      this.setState({
        selectedKey:nextProps.selectedKey,
        items:itemsAndOffset.items
      });
    
   
  }




  renderIndicator(){
  	if(this.itemWidth>0){
  		var {offset} = this.state;
  		var left = 0;
  		var extendsStyle = {};
  		if(this.props.getIndicatorStyle){
  			extendsStyle = this.props.getIndicatorStyle({
  				selectedItemData:this.state.data[this.preSelectedIndex]
  			})||{};
  		}
  		var wrapperStyle = extendsStyle.wrapper||{};
  		delete wrapperStyle.left;
			delete wrapperStyle.position;
  		var WS = {...{
  				left:offset,
  				width:StyleSheet.isWeb?this.itemWidth+"px":this.itemWidth,
  				bottom:0,
  				position:"absolute"
  		},...wrapperStyle};
  		var IS = {...{
  					position:"relative",
  					backgroundColor:Theme.theme_color,	
  					height:StyleSheet.px(6),
  				},...extendsStyle.inner||{}}
  		return <Animated.View
  			style={WS}>
  			<View style={IS}
  			></View>
  		</Animated.View>;
  	}
  	return null;
  }

  measureWidth(itemInstance){
  	if(this.itemWidth>0){
  		return;
  	}
  	this.itemhasMountCount+=1;
  	if(this.itemhasMountCount===this.state.data.length){
  		setTimeout(()=>{
  			UIManager.measureRef(itemInstance,(rect)=>{
				this.itemWidth = rect.width;
				if(this.itemWidth>0){
					this.setState({
						renderSeed:this.state.renderSeed+1,
						offset:new Animated.Value(this.preSelectedIndex*this.itemWidth),
					});
				}
			});
  		},500)
  	}

	
  }

  LayoutAnimation(){
		LayoutAnimation.spring();
  }



  render() {
	var child = [];


	var Wrapper = View;
	if(this.props.scroll){
		Wrapper = ScrollView;
	}
	
	var indicator = null;
	if(this.props.indicator!==false){
		indicator = this.renderIndicator();
	}
    return (<Wrapper showsHorizontalScrollIndicator={false} scrollEnabled={true} horizontal={true} style={this.wrapperStyle }>
      {this.state.items}
      {indicator}
      </Wrapper>);
  }
}


class Item extends React.Component{

	itemPress(itemdata,i,event){
	  if(this.props.parent.props.onChange){
	      this.props.parent.props.onChange({
	        selectedData:itemdata,
	        preSelectedData:this.props.parent.preSelectedData,
	        selectedIndex:i,
	        preSelectedIndex:this.props.parent.preSelectedIndex,
	        sender:this
	      });
	    }
	}

	componentDidMount(){
		if(this.itemInstance){
			this.props.measureWidth(this.itemInstance);
		}
	}

	render(){
		var selectedStyle = {};
		if(this.props.selected){
			selectedStyle.backgroundColor = this.tabs_selected_backgroundcolor;
		}
		var propsItemStyle = this.props.itemStyle||{};
		var itemStyle = {};

		if(this.props.scroll){
		  if(!propsItemStyle.width){
		  	propsItemStyle.width = StyleSheet.px(220);
		  	if(StyleSheet.isWeb){

		  	}
		  }else{

		  }
		  delete itemStyle.flex;

		}else{
			itemStyle.flex = 1;
		}


		return (
			<TouchableHighlight 
			ref = {(itemInstance)=>{
				if(!StyleSheet.isWeb){
					this.itemInstance = itemInstance;
				}

			}}
       		   underlayColor = {this.props.parent.props.underlayColor||Theme.tabs_press_underlaycolor}
     		   onPress = {this.itemPress.bind(this,this.props.itemdata,this.props.index)}
               key={this.props.itemdata.key+"item"} 
               style={itemStyle}>
          <View 
	      	ref = {(itemInstance)=>{
	      		if(StyleSheet.isWeb){
	      			this.itemInstance = itemInstance;
	      		}
	      	}}
          	style={{
          		...{
          			position:"relative",
	          		flexDirection:"column",
	          		height:"100%",
	          		width:"100%",
	          		justifyContent:"center",
	   		        alignItems:"center"},
	    		...selectedStyle,
	    		...propsItemStyle||{}
    	 }}>
              {
                this.props.parent.props.renderItem && 
                this.props.parent.props.renderItem({
                  index:this.props.index,
                  itemData:this.props.itemdata,
                  sender:this,
                  selected:this.props.selected
                })
              }
          </View>
        </TouchableHighlight>)
	}


}

