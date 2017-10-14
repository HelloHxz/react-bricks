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
		this.offsetY = 0;
		this.offsetX = 0;
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
		this.offsetY = 10;
		this.offsetX = 10;
	}
	componentWillReceiveProps(nextProps){
		this.process(nextProps);
	}

	caculatePosition(rect,popWidth,popHeight){
      rect.right = rect.left+rect.width;
      rect.bottom = rect.top+rect.height;

      var direction = (this.state.direction||"").toLowerCase();
      if(["bottom","top","left","right"].indexOf(direction)<0){
        direction = "bottom";
        if(rect.top-popHeight-this.offsetY>=0){
          direction = "top";
        }else if(rect.bottom+popHeight<=StyleSheet.screen.height-this.offsetY){
          direction = "bottom";
        }else if(rect.left-popWidth-this.offsetX>=0){
          direction = "left";
        }else if(rect.right+popWidth+this.offsetX<=StyleSheet.screen.width){
          direction = "right";
        }
      }

      var pos = {};
      switch(direction){
        case "top":
        	var top = rect.top - popHeight - this.offsetY;
        	if(top>0){
        		pos["top"] = top ;
        	}else{
        		pos["top"] = rect.bottom+this.offsetY;
        	}
            pos = this._getLeft(pos,rect,popWidth,popHeight,"bottom");
        break;
        case "bottom":
        	var top = rect.bottom+this.offsetY;
        	if(top+popHeight>StyleSheet.screen.height){
        		pos["bottom"] =  StyleSheet.screen.height-rect.top+this.offsetY;
        	}else{
         	  pos["top"] = top;
        	}
          pos = this._getLeft(pos,rect,popWidth,popHeight,"top");
        break;
        case "right":
          var left = (rect.right+this.offsetX);
          if(left+popWidth>StyleSheet.screen.width){
          	pos["right"] = (StyleSheet.screen.width-rect.left+this.offsetX);
          }else{
          	pos["left"] = left;
          }
          pos = this._getTop(pos,rect,popWidth,popHeight,"left");
        break;
        case "left":
          var right = (StyleSheet.screen.width-rect.left+this.offsetX);
          if(rect.left-this.offsetX-popWidth<0){
          	pos["left"] = (rect.right+this.offsetX);
          }else{
          	pos["right"] = right;
          }
          pos = this._getTop(pos,rect,popWidth,popHeight,"right");
        break;
        default:
           	var top = rect.bottom+this.offsetY;
        	if(top+popHeight>StyleSheet.screen.height){
        		pos["bottom"] =  StyleSheet.screen.height-rect.top+this.offsetY;
        	}else{
         	  pos["top"] = top;
        	}
           pos = this._getLeft(pos,rect,popWidth,popHeight,"top");
        break;
      }
      if(StyleSheet.isWeb){
      	for(var key in pos){
      		pos[key] = pos[key]+"px";
      	}
      }
		this.setState({
			pos:pos
		});
	}


	_getLeft(pos,rect,ow,oh,tridirection){
	    var left = rect.left+rect.width/2-ow/2+this.offsetX;
	    if(left+ow+this.offsetX>StyleSheet.screen.width){
	      left = StyleSheet.screen.width - ow-this.offsetX;
	    }
	    if(left<0){
	      left = this.offsetX;
	    }
	    pos["left"] = left;
	    return pos;
	}

	_getTop(pos,rect,ow,oh,tridirection){
	    //this.tri
	    var top = rect.top+rect.height/2-oh/2+this.offsetY;
	    if(top+oh+this.offsetY>StyleSheet.screen.height){
	      top = StyleSheet.screen.height - oh-this.offsetY;
	    }
	    if(top<0){
	      top = this.offsetY;
	    }

	    var triTop = (rect.top - top)+rect.height/2;
	    pos["top"] = top;
	    return pos;
	 }

	process(props){
		const targetRect = this.props.parent.targetRect;
		if(!this.instance||!targetRect){
			return;
		}
		if(props.isShow){
			setTimeout(()=>{
				UIManager.measureRef(this.instance,(x,y,width,height)=>{
					this.caculatePosition(targetRect,width,height);
					this.showOrHide(true);
				});
			},20)
		}else{
			this.showOrHide(false);
		}
		
	}

	showOrHide(isShow){
		Animated.timing(
		        this.state.openValue,
		        {
		          toValue:isShow?1:0,
		          duration:180,
		          bounciness: 0, 
		          easing:Easing.ease,
		          restSpeedThreshold: 1
		        }
		).start()
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
				style={{...StyleSheet.create({zIndex:200,position:"absolute"}),
				...this.state.pos,
				...{opacity:op}}}>
					{this.renderItem()}
				</Animated.View>;
	}
}

export default Popover;