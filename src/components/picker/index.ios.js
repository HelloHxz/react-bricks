import {Picker} from 'react-native'
import React from 'react';
import View from '../view'
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





export default class P extends React.Component{

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

	    this.columnsCount = this.cascadeCount||this.props.datasource.length;
        this.selectedIndexs = this.getSelectedIndexs(props);
        this.instanceDict={};
		this.state = {
			selectedValue:"java"
		}
	}

	 getSelectedIndexs(props){
	    var re = [];
	    if(props.selectedValues){
	      if(this.isCascade){
	        return this.getSelecedIndexsByValueWhenIsCascade(props);
	      }else{
	        return this.getSelectedIndexsByValue(props);
	      }
	    }else if(props.selectedIndexs){
	      if(!(props.selectedIndexs instanceof Array)){
	         return this.getDefaultSelectedIndexs();
	      }
	      return this.getDefaultSelectedIndexs(props.selectedIndexs);
	    }else{
	      return this.getDefaultSelectedIndexs();
	    }
	    return this.getDefaultSelectedIndexs();
	  }

	  getSelectedIndexsByValue(props){
	    var value = props.selectedValues||[];
	    if(!(value instanceof Array)){
	      value = [];
	    }
	    var selectedIndexs = [];
	    var index = 0;
	    for(var i=0;i<this.columnsCount;i++){
	      index = this._getIndexByValue(value[i],props.datasource[i]);
	      selectedIndexs.push(index);
	    }
	    return selectedIndexs;
	  }

	  getSelecedIndexsByValueWhenIsCascade(props){
	    var value = props.selectedValues||[];
	    if(!(value instanceof Array)){
	      value = [];
	    }
	    var curData = props.datasource[0];
	    var selectedIndexs = [];
	    var index = 0;
	    for(var i=0;i<this.columnsCount;i++){
	      if(i===0){
	        index = this._getIndexByValue(value[i],curData);
	        curData = curData[index].children||[];
	      }else{
	        index = this._getIndexByValue(value[i],curData||[]);
	        var c = curData[index]||{};
	        curData = c.children||[];
	      }
	      selectedIndexs.push(index);
	    }

	    return selectedIndexs;

	  }


  _getIndexByValue(value,arr){
    if(!value){
      return 0;
    }
    arr = arr||[];
    var index = 0;
    for(var i=0,j=arr.length;i<j;i++){
      if(arr[i].label===value){
        index = i;
        break;
      }
      if(this.props.valueIsInt){
        if(parseInt(arr[i].label)===parseInt(value)){
          index = i;
          break;
        }
      }
    }
    return index;
  }

  getDefaultSelectedIndexs(paramsArr){
    var re=[];
    paramsArr = paramsArr||[];
    for(var i=0;i<this.columnsCount;i++){
      var p = paramsArr[i]||0;
      if(isNaN(p)){
        p=0;
      }else{
        p=parseInt(p);
      }
      re.push(p);
    }
    return re;
  }


  repaireIndex(index,columData){
  
    if(index<0||index>=columData.length){
      return 0;
    }
    return index;

  }



  getColumns(){
  	 var columns =[];

    if(this.isCascade){
      var preSelectedItemData = null;
      for(var i=0;i<this.columnsCount;i++){
        var curkey = "column_"+i;
        var data = [];
        var selectedIndexInCol = this.selectedIndexs[i];
        if(i===0){
          data = this.props.datasource[0];
          selectedIndexInCol = this.repaireIndex(selectedIndexInCol,data);
          preSelectedItemData = data[selectedIndexInCol].children||[];
        }else{
          data = preSelectedItemData;
          selectedIndexInCol = this.repaireIndex(selectedIndexInCol,data);
          if(!preSelectedItemData[selectedIndexInCol]){
            preSelectedItemData = [];
          }else{
           preSelectedItemData = preSelectedItemData[selectedIndexInCol].children||[];
          }
        }
        columns.push(<SelectorColumn selectedIndex={selectedIndexInCol} columnIndex={i} data={data} parent={this} pkey={curkey} itemHeight={this.itemHeight} key={curkey}/>);
      }
    }else{
      for(var i=0;i<this.columnsCount;i++){
        var curkey = "column_"+i;
        var data = this.props.datasource[i];
         var selectedIndexInCol = this.selectedIndexs[i];
        columns.push(<SelectorColumn columnIndex={i} selectedIndex={selectedIndexInCol} data={data} parent={this} pkey={curkey} itemHeight={this.itemHeight} key={curkey}/>);
      }
    }
    return columns;
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

