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

	// componentWillReceiveProps(nextProps){

	// }

	onValueChange(value){
		this.setState({selectedValue: value},()=>{
			this.bindNextChildData(value)
		})
	}

	bindNextChildData(value){

	    if(!this.props.parent.isCascade){
	      return;
	    }
	    if(this.props.columnIndex>=this.props.parent.columnsCount-1){
	      return;
	    }

	    var nextColumnData = [];
		if(!value&&value!==0){
			nextColumnData = this.state.data[0].children||[];
		}else{
			for(var i=0,j=this.state.data.length;i<j;i++){
				var itemdata = this.state.data[i];
				if(itemdata.value===value){
					nextColumnData = itemdata.children||[];
					break;
				}
			}
		}
	    var nextKey ="column_"+(this.props.columnIndex+1);
	    var nextInstance= this.props.parent.instanceDict[nextKey];
	    if(nextInstance){
	      nextInstance.bindData(nextColumnData);
	    }
   }

  bindData(data){
    this.setState({
      data:data,
      selectedValue:data[0].value,
    },()=>{
      this.bindNextChildData(data[0].value);
    });
    

  }

	render(){
		var child = [];
		for(var i=0,j=this.state.data.length;i<j;i++){
	      var itemdata = this.state.data[i];
	      child.push(<Picker.Item key={i} label={itemdata.label} value={itemdata.value}/>);
	    }
		return (<Picker
			  style={{flex:1}}
	   		  onValueChange={this.onValueChange.bind(this)}
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

