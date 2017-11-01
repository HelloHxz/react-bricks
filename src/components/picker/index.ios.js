import {Picker} from 'react-native'
import React from 'react';
import View from '../view'
import Base from './common'
import Easing from '../easing'
import StyleSheet from '../style'
import Modal from '../modal';
import Animated from '../animated'
import TouchableWithoutFeedback from '../touchablewithoutfeedback'

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
        this.hasInitPopContent = false;
        this.state={
        	seed:0,
    		showValue:new Animated.Value(0),
    		show:false
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
				if(nextProps.show===false){
					 Animated.timing(
				        this.state.showValue,
				        {
				          toValue: 0,
				          duration:280,
				          bounciness: 0, 
				          easing:Easing.in(),
				          restSpeedThreshold: 0.1
				        }
				      ).start(()=>{
				      	this.setState({
				      		show:false
				      	})
				      })
				  }else{
				  	this.setState({
						show:nextProps.show
					});
				  }
				
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
        var Wrapper = View;


	     if(this.type==="pop"){
	     	if(!this.state.show&&!this.hasInitPopContent){
	     		return null;
	     	}
	     	
	     	this.hasInitPopContent = true;
			const drawerTranslateY = this.state.showValue.interpolate({
				inputRange: [0, 1],
				outputRange:[200,0],
				extrapolate: 'clamp',
			});
			wrapperStyle = {...wrapperStyle,...{
				position:"absolute",
				bottom:0,
				zIndex:10,
				transform:[{"translateY":drawerTranslateY}]
			}}
			Wrapper = Animated.View;
	    }

		return (
			<Wrapper style={wrapperStyle}>
	        	<View style={{zIndex:11,height:.8,width:"100%",top:90,backgroundColor:"#d3d3d3",position:"absolute"}}></View>
	        	<View style={{zIndex:11,height:.8,width:"100%",top:125,backgroundColor:"#d3d3d3",position:"absolute"}}></View>
	        	{this.getColumns()}
			</Wrapper>)
	}

	bkPress(){
		if(this.props.onBackLayerClick){
			this.props.onBackLayerClick();
		}
	}

	renderBK(){
		const overlayOpacity = this.state.showValue.interpolate({
	      inputRange: [0, 1],
	      outputRange: [0, 0.15],
	      extrapolate: 'clamp',
	    });

	    var bkLayer={
	    	backgroundColor: '#000',
    		flex:1,
    		opacity:overlayOpacity
	    }
		
		return <TouchableWithoutFeedback onPress={this.bkPress.bind(this)} >
	  		<Animated.View style={bkLayer}/>
	  	</TouchableWithoutFeedback>;
	}


	onShow(){
		Animated.timing(
        this.state.showValue,
        {
          toValue: 1,
          duration:110,
          easing:Easing.ease,
        }
      ).start()
	}


	render(){
		

	    if(this.type==="pop"){
	    	return <Modal
	    		onShow={this.onShow.bind(this)}
	    		transparent={false}
        	    visible={this.state.show}
	    	>{this.renderContent()}
	    	 {this.renderBK()}
	    	</Modal>
	    }

	    return this.renderContent();
		
	}
}

