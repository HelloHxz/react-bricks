import {Picker} from 'react-native'
import React from 'react';
import View from '../view'
import Base from './common'
import StyleSheet from '../style'
import SlideModal from '../slideModal';

class SelectorColumn extends React.Component{
	constructor(props){
		super(props);
		props.parent.instanceDict[props.pkey] = this;
    	this.selectedIndex = props.selectedIndex||0;
    	this.state = {
    		selectedValue:props.data[this.selectedIndex].value,
    		data:props.data,
    	}

	}

	// componentWillReceiveProps(nextProps){
	// 	this.selectedIndex = nextProps.selectedIndex||0;
	// 	this.setState ( {
 //    		selectedValue:nextProps.data[this.selectedIndex].value,
 //    		data:nextProps.data
 //    	})
	// }

	getSelectedIndexByValue(value){
		var selectedIndex = 0;
		for(var i=0,j=this.state.data.length;i<j;i++){
				var itemdata = this.state.data[i];
				if(itemdata.value===value){
					selectedIndex = i;
					break;
				}
		}
		return selectedIndex;
	}

	onValueChange(value){
		if(!this.props.parent.isCascade){
		  this.setState({selectedValue: value})
	      return;
	    }
	    var allSelectedIndex = this.props.parent.getSelectedIndexs();
	    allSelectedIndex[this.props.columnIndex]= this.getSelectedIndexByValue(value);
	    for(var i=this.props.columnIndex+1;i<this.props.parent.columnsCount;i++){
	    	allSelectedIndex[i] = 0;
	    }
		this.props.parent.rebind(allSelectedIndex);
	}

	
	render(){
		var child = [];
		for(var i=0,j=this.state.data.length;i<j;i++){
	      var itemdata = this.state.data[i];
	      child.push(<Picker.Item key={i} label={itemdata.label} value={itemdata.value}/>);
	    }
		return (<Picker
			  style={{flex:1,backgroundColor:"#fff"}}
	   		  onValueChange={this.onValueChange.bind(this)}
			  selectedValue={this.state.selectedValue}>
			  	{child}
			</Picker>)
	}
}





export default class P extends Base{

	constructor(props){
		super(props);
		this.type = props.type||"inline";
		this.preKeyStr = "column_";
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
        this.selectedIndexs = this._getSelectedIndexs(props);
        this.instanceDict={};
        this.state={
        	seed:0,
    		show:props.show
        }
	}

	rebind(selectedIndexs){
		this.preKeyStr = this.preKeyStr+this.state.seed;
		this.selectedIndexs  = selectedIndexs;
		this.setState({seed:this.state.seed+1});
	}

	componentWillReceiveProps(nextProps){
		if(this.type==="pop"){
			if(this.state.show!==nextProps.show){
				this.setState({
						show:nextProps.show
				});
			}
		}
	}

	getSelectedValues(){
		for(var i=0;i<this.columnsCount;i++){
			var key = this.preKeyStr+i;

		}
	}

	getSelectedIndexs(){
		var re = [];
		for(var i=0;i<this.columnsCount;i++){
			var key = this.preKeyStr+i;
			var instance = this.instanceDict[key];
			re.push(instance.getSelectedIndexByValue(instance.state.selectedValue));
		}
		return re;
	}

	renderContent(){
		var wrapperStyle = {
     	    position:"relative",
        	display:"flex",
        	width:"100%",
        	flexDirection:"row",
        	backgroundColor:"#fff",
        	overflow:"hidden"
        };

		return (
			<View style={wrapperStyle}>
	        	<View style={{zIndex:11,height:.8,width:"100%",top:90,backgroundColor:"#d3d3d3",position:"absolute"}}></View>
	        	<View style={{zIndex:11,height:.8,width:"100%",top:125,backgroundColor:"#d3d3d3",position:"absolute"}}></View>
	        	{this.getColumns()}
			</View>)
	}


	render(){
	    if(this.type==="pop"){
	    	return <SlideModal
	    		onBackLayerClick={this.props.onBackLayerClick}
        	    visible={this.state.show}
	    	>{this.renderContent()}
	    	</SlideModal>
	    }

	    return this.renderContent();
		
	}
}

