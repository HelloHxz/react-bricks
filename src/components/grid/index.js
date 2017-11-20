import React from 'react';
import View from '../view';
import TouchableHighlight from '../touchablehighlight';
import StyleSheet from '../style';
import Text from '../text'


function px(v){
	if(StyleSheet.isWeb){
		return v+"px";
	}
	return v;
}

var wrapperStyle = {flexWrap:"wrap",backgroundColor:"#fff",display:"flex",flexDirection:"row"};
export default class Grid extends React.Component{
	
	constructor(props){
		super(props);
		this.coumnCount = this.props.column || 2;
		if(isNaN(this.coumnCount)){
			this.coumnCount = 2;
		}
		var style = this.props.style||{};
		if(style.width){
			if(StyleSheet.isWeb){
				this.columnWidth = (parseFloat(style.width)/this.coumnCount)+"rem";
			}else{
				this.columnWidth = (parseFloat(style.width)/this.coumnCount);
			}
		}else{
			this.columnWidth = px(StyleSheet.screen.width/this.coumnCount);
		}
		
		this.state = {
			data:this.props.data||[]
		}
		
	}
	itemPress(){
		if(this.props.onItemPress){
			this.props.onItemPress();
		}
	}

	render(){
		var child = [];

		var len = this.state.data.length;

		var borderWidth = this.props.bordernone?0:1;

		
		len =  Math.ceil(len/this.coumnCount)*this.coumnCount;

		var cellHeight = {};

		var itemStyle = this.props.itemStyle||{};
		
		if(!itemStyle.height){
			itemStyle.height = this.columnWidth;
		}

		for(var i=0,j=len;i<j;i++){
			var item = null;
			if(i<this.state.data.length&&this.props.renderItem){
				item = this.props.renderItem({
					index:i,
					itemData:this.state.data[i],
					sender:this
				});
			}

		    var borderLeftWidth=0;
			var	borderRightWidth=((i+1)%this.coumnCount===0)?0:borderWidth;
			var	borderTopWidth = i<this.coumnCount?borderWidth:0;
			var	borderBottomWidth=borderWidth;
				
			if(this.coumnCount===4){
				borderLeftWidth = borderWidth;
				borderRightWidth = 0;
				borderTopWidth = borderWidth;
				borderBottomWidth = Math.ceil((i+1)/this.coumnCount) === this.coumnCount+1?borderWidth:0;
			} 

			if(i<this.coumnCount){
				borderTopWidth = 0;
			}
			if(len/this.coumnCount===parseInt(i/this.coumnCount)+1){
				borderBottomWidth = 0;
			}

			if(i%this.coumnCount===0){
				borderLeftWidth = 0;
			}


			child.push(<TouchableHighlight 
				underlayColor="#eee"
				onPress = {this.itemPress.bind(this)}
				key={i} style={{
				...{
					position:"relative",
					width:(this.columnWidth),
				},
				...StyleSheet.create({
					borderLeftWidth:borderLeftWidth,
					borderBottomWidth:borderBottomWidth,
					borderTopWidth:borderTopWidth,
					borderRightWidth:borderRightWidth,
					borderColor:"#bbb",
					borderStyle:"solid"
				})}
			}>
				<View 
					style={{
						...{
							position:"relative",
							justifyContent:"center",
							alignItems:"center",
							flexDirection:"column",
							width:"100%",
							height:"100%"
						},
						...itemStyle}}
				>{item}</View>
				</TouchableHighlight>);
		}
		return <View style={{...wrapperStyle,...this.props.style||{}}}>{child}</View>
	}

}