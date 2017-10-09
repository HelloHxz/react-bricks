import React from 'react';
import Easing from '../easing';
import Text from '../text'
import View from '../view'
import Animated from '../animated'
import TouchableWithoutFeedback from '../touchablewithoutfeedback'
import StyleSheet from '../style';
import UIManager from '../uimanager'


var styles = StyleSheet.create({
	wrapper:{
		position:"absolute",
		backgroundColor:"transparent",
		overflow:"hidden",
		zIndex:1000
	},
	wrapper_hide:{
		left:-1000,
		width:0,
		height:0
	},
	wrapper_show:{
		top:0,
		left:0,
		right:0,
		bottom:0,
	},
	bkLayer:{
		position:"absolute",
		top:0,
		left:0,
		opacity:.05,
		right:0,
		bottom:0,
		backgroundColor:"#000",
		overflow:"hidden",
		zIndex:1,
	}
})

class Popover extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			rect:null,//{x y width height}
			isShow:false,
			direction:"top" // top right bottom left auto
		}
	}

	componentDidMount(){
		
	}
	componentWillReceiveProps(nextProps){
		var config = nextProps.config || {};
		if(config.rect){
			this.targetRect = config.rect;
			if(this.state.isShow){
			
			}else{
				this.setState({isShow:true,rect:config.rect},function(){
				});
			}
		}else{
			this.setState({rect:null});
			setTimeout(()=>{
			  	this.setState({isShow:false});
			  },310)
		}

	}

	bkPress(){
		this.props.onBackLayerClick&&this.props.onBackLayerClick();
	}
	renderChild(openValue){
		const isShow = !!this.state.rect;
		return <PopoverItem parent={this} isShow={isShow}/>
	}
	render(){
		const {
		  openValue
		} = this.state;
		const wrapperStyle = this.state.isShow?styles.wrapper_show:styles.wrapper_hide;
		return (<View style={{...styles.wrapper,...wrapperStyle}}>
				<TouchableWithoutFeedback onPress={this.bkPress.bind(this)}>
					<Animated.View style={styles.bkLayer}></Animated.View>
				</TouchableWithoutFeedback>
				{this.renderChild(openValue)}
			</View>);
	}
}

class PopoverItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			openValue:new Animated.Value(0),
			pos:{left:0,top:0}
		}
		this.isInit = true;
		this.process(props);
	}
	componentWillReceiveProps(nextProps){
		this.process(nextProps);
	}

	caculatePosition(targetRect,popWidth,popHeight){
		//	console.log(targetRect.x,targetRect.y,targetRect.width,targetRect.height);
		//	console.log(x,y,width,height);
		this.setState({
			pos:{left:targetRect.left+targetRect.width,top:targetRect.top+targetRect.height}
		});
	}

	process(props){
		const targetRect = this.props.parent.targetRect;

		if(!this.instance||!targetRect){
			return;
		}
		setTimeout(()=>{
			UIManager.measureRef(this.instance,(x,y,width,height)=>{

		
			this.caculatePosition(targetRect,width,height);
			Animated.timing(
		        this.state.openValue,
		        {
		          toValue: props.isShow?1:0,
		          duration:180,
		          bounciness: 0, 
		          easing:Easing.ease,
		          restSpeedThreshold: 1
		        }
		      ).start(
		      	
		      )
			});
		},20)
	}

	renderItem(){
		if(this.isInit){
			this.isInit = false;
			return null;
		}
		if(!this.child){
			this.child = this.props.parent.props.renderItem();
		}
		return this.child;


	}
	render(){
		var {openValue} = this.state;
		var op = openValue.interpolate({
		      inputRange: [0,1],
		      outputRange: [0, 1],
		      extrapolate: 'clamp',
		    });
		return <Animated.View
				ref={(instance)=>{
					this.instance = instance;
				}}
				style={{...StyleSheet.create({zIndex:200,backgroundColor:"#fff",position:"absolute"}),
				...{top:this.state.pos.top,left:this.state.pos.left},
				...{opacity:op}}}>
					{this.renderItem()}
				</Animated.View>;
	}
}

export default Popover;