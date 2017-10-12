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
export default class Grid extends React.Component{
	
	constructor(props){
		super(props);
		this.coumnCount = this.props.column || 2;
		if(isNaN(this.coumnCount)){
			this.coumnCount = 2;
		}

		this.columnWidth = (StyleSheet.screen.width/this.coumnCount);
		this.state = {
			data:this.props.data||[]
		}
		this.cellHeight = this.props.cellHeight||this.columnWidth;
	}

	render(){
		var child = [];

		//i%this.coumnCount!==0?1:0
		//(i===j-1&&(i+1)/this.coumnCount!==0)?1: 0
		var len = this.state.data.length;


		
		len =  Math.ceil(len/this.coumnCount)*this.coumnCount;
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
			var	borderRightWidth=((i+1)%this.coumnCount===0)?0:1;
			var	borderTopWidth = i<this.coumnCount?1:0;
			var	borderBottomWidth=1;
				
			if(this.coumnCount===4){
				borderLeftWidth = 1;
				borderRightWidth = 0;
				borderTopWidth = 1;
				borderBottomWidth = Math.ceil((i+1)/this.coumnCount) === this.coumnCount+1?1:0;
			} 


			child.push(<View key={i} style={{
				...{
					position:"relative",
					justifyContent:"center",
					alignItems:"center",
					flexDirection:"column",
					width:px(this.columnWidth),
					height:px(this.cellHeight)
				},
				...StyleSheet.create({
					borderLeftWidth:borderLeftWidth,
					backgroundColor:"#fff",
					borderBottomWidth:borderBottomWidth,
					borderTopWidth:borderTopWidth,
					borderRightWidth:borderRightWidth,
					borderColor:"#bbb",
					borderStyle:"solid"
				})}
			}>
				{item}
				</View>);
		}
		return <View style={{flexWrap:"wrap",display:"flex",flexDirection:"row"}}>{child}</View>
	}

}