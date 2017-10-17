import React from 'react';
import StyleSheet from '../style';
import View from '../view';
import ScrollView from '../scrollview'
import Theme from '../theme';
import UIManager from '../uimanager'
import TouchableHighlight from '../touchablehighlight'
import LayoutAnimation from '../layoutanimation';


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
	this.state = {
		data:props.data||[],
		selectedKey:selectedKey,
		renderSeed:0
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




  renderIndicator(){
  	if(this.itemWidth>0){
	UIManager.setLayoutAnimationEnabledExperimental();
	LayoutAnimation.spring();
  		return <View
  			style={{
  				left:StyleSheet.isWeb?(this.preSelectedIndex*this.itemWidth)+"px":(this.preSelectedIndex*this.itemWidth),
  				width:StyleSheet.isWeb?this.itemWidth+"px":this.itemWidth,
  				height:StyleSheet.px(6),
  				backgroundColor:"orange",
  				bottom:0,
  				position:"absolute"
  			}}
  		></View>;
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
  			UIManager.measureRef(itemInstance,(x,y,width,height)=>{
				this.itemWidth = width;
				if(this.itemWidth>0){
					this.setState({
						renderSeed:this.state.renderSeed+1
					});
				}
			});
  		},10)
  	}

	
  }



  render() {
	var child = [];


	var Wrapper = View;
	if(this.props.scroll){
		if(StyleSheet.isWeb){

		}else{
			Wrapper = ScrollView;
		}
	}

	for(var i=0,j=this.state.data.length;i<j;i++){
		itemdata = this.state.data[i];
		if(!itemdata.key){
			console.error("tabs data属性每项数据需要key字段");
		}
		var selected = false;
		if(this.state.selectedKey === itemdata.key){
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
		itemStyle={this.props.itemStyle}
		></Item>);
   }


    return (<Wrapper showsHorizontalScrollIndicator={false} scrollEnabled={true} horizontal={true} style={this.wrapperStyle }>
      {child}
      {this.renderIndicator()}
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

