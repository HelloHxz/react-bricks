import {Picker} from 'react-native'
import React from 'react';
import View from '../view'
import Base from './common'
import StyleSheet from '../style'

function px(val){
	if(StyleSheet.isWeb){
		return val+"px";
	}
	return val;
}

class SelectorColumn extends React.Component{
	constructor(props){
		super(props);
		props.parent.instanceDict[props.pkey] = this;
    	this.selectedIndex = props.selectedIndex||0;
    	this.state = {
    		selectedValue:props.data[this.selectedIndex].value,
    		data:props.data
    	}
	}
	render(){
		var child = [];
		for(var i=0,j=this.state.data.length;i<j;i++){
	      var itemdata = this.state.data[i];
	      child.push(<Picker.Item key={i} label={itemdata.label} value={itemdata.value}/>);
	    }
		return (<Picker
			  style={{flex:1}}
	   		  onValueChange={(value) => this.setState({selectedValue: value})}
			  selectedValue={this.state.selectedValue}>
			  	{child}
			</Picker>)
	}
}





export default class P extends Base{

	constructor(props){
		super(props);
		this.isCascade = false;
	    if(this.props.cascadeCount){
	      if(isNaN(this.props.cascadeCount)){
	        console.error("cascadeCount 必须为数字");
	      }else{
	        this.isCascade = true;
	        this.cascadeCount = parseInt(this.props.cascadeCount);
	      }
	    }
	    this.SelectorColumn = SelectorColumn;
	    this.columnsCount = this.cascadeCount||this.props.datasource.length;
        this.selectedIndexs = this.getSelectedIndexs(props);
        this.instanceDict={};
		this.state = {
			selectedValue:"java"
		}
	}


	render(){
		return (
			<View style={{
        	position:"relative",
        	display:"flex",
        	flexDirection:"row",
        	backgroundColor:"#fff",
        	overflow:"hidden"
        }}>
        	{this.getColumns()}
			</View>)
	}
}

