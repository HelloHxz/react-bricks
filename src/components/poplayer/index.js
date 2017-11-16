import React from 'react';
import Easing from '../easing';
import Text from '../text'
import View from '../view'
import Animated from '../animated'
import TouchableWithoutFeedback from '../touchablewithoutfeedback'
import StyleSheet from '../style'

/*
	positionRect
	config
*/

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
		right:0,
		bottom:0,
		backgroundColor:"#000",
		overflow:"hidden",
		opacity:0.2,
		zIndex:1,
	},
	layer:{
		width:"100%",
		zIndex:2,
		position:"absolute",
		top:0
	}
});
class PopLayer extends React.Component {

	bkPress(){
		this.props.onBackLayerClick&&this.props.onBackLayerClick();
	}

	constructor(props){
		super(props)
		//config {key:"",dirction:"bottom",cache:true}
		this.state = {
			openValue: new Animated.Value(0),
			isShowVisiblity:false, // 显示背景 然后动画
			isShow:false,
			renderSeed:0
		}
		if(!props.renderItem){
			console.error("poplayer组件需要 renderItem 属性");
		}
		this.preSelectedKey = "";
		/*
			key:{
				instance:xx,
				config:{key:"",direction:"",cache:}
			},
			key:{
				
			}
		*/
		this.itemDict={};
	}
	componentWillReceiveProps(nextProps){
		var config = nextProps.config || {};
		if(config.key){
			if(!this.itemDict[config.key]||config.cache === false){
				this.itemDict[config.key] = {
					instance:this.props.renderItem(config),
					config:config
				}
			}
			if(this.state.isShow){
			
			}else{
				this.setState({isShowVisiblity:true,isShow:true},function(){
					setTimeout(()=>{
						this.setState({isShowVisiblity:false});
						Animated.timing(
					        this.state.openValue,
					        {
					          toValue: 1,
					          duration:300,
					          bounciness: 0, 
					          easing:Easing.ease,
					          restSpeedThreshold: 1
					        }
					      ).start(
					      	
					      )
					},20)
				});
			}
		}else{
			Animated.timing(
		        this.state.openValue,
		        {
		          toValue: 0,
		          duration:300,
		          bounciness: 0, 
		          easing:Easing.ease,
		          restSpeedThreshold: 1
		        }
			).start(()=>{
			  	this.setState({isShow:false,isShowVisiblity:false});
			})
		}


		
    }


	render() {
		const {
		  openValue
		} = this.state;
		const curConfig = this.props.config||{};
		const curSelectedKey = curConfig.key;
		let overlayOpacity = 0;
		if(this.state.isShowVisiblity){
		}else{
			overlayOpacity = openValue.interpolate({
		      inputRange: [0, 1],
		      outputRange: [0.1, 0.2],
		      extrapolate: 'clamp',
		    });
		}
	    const animatedOverlayStyles = { opacity: overlayOpacity };
	    const showOrHide = this.state.isShow?styles.wrapper_show:styles.wrapper_hide;

	    let children = [];
	    for(const key in this.itemDict){
	    	let type = "";
	    	if(key === curSelectedKey){
	    		if(!this.preSelectedKey||this.preSelectedKey===""){
	    			//没有其他显示的情况下 动画显示
	    			type = "animatedshow";
	    		}else{
	    			type = "noanimatedshow";
	    		}
	    	}else{
	    		if(this.preSelectedKey===key&&!curConfig.key){
	    			//config 设置为null 或者 为{} 的时候收起，将当前显示的项目动画隐藏
	    			type = "animatedhide";
	    		}else{
	    			type = "noanimatedhide";
	    		}
	    	}
	    	var itemConfig = this.itemDict[key];
	    	children.push(<PopLayerItem key={key} itemconfig={itemConfig.config} parent={this} animatetype={type}>{
	    		itemConfig.instance
	    	}</PopLayerItem>);

	    }
		return (
		  <View style={{...styles.wrapper,...showOrHide,...(this.props.wrapperStyle||{})}}>
		  	<TouchableWithoutFeedback onPress={this.bkPress.bind(this)} >
		  		<Animated.View style={{...styles.bkLayer,...animatedOverlayStyles}}/>
		  	</TouchableWithoutFeedback>
		  	{children}
		  </View>
		);
	}
}


//

class PopLayerItem extends React.Component{
	// noAnimateShow animateShow noAnimateHide animateHide
	constructor(props){
		super(props);
		this.state = {
			openValue: new Animated.Value(0),
		}
		this.isShow = false;
		this.pro(props);
	}

	componentWillReceiveProps(nextProps){
		this.pro(nextProps);
	}
	pro(nextProps){

		if(nextProps.animatetype==="animatedshow"){
			if(this.isShow){
				return;}
			this.isShow = true;
			Animated.timing(
		        this.state.openValue,
		        {
		          toValue: 1,
		          duration:200,
		          bounciness: 0, 
		          easing:Easing.ease,
		          restSpeedThreshold: 1
		        }
		      ).start(()=>{
		      	nextProps.parent.preSelectedKey = nextProps.itemconfig.key;
		      })
		}else if(nextProps.animatetype==="animatedhide"){
			if(!this.isShow){return;}
		    this.isShow = false;
		    
			Animated.timing(
		        this.state.openValue,
		        {
		          toValue: 0,
		          duration:200,
		          bounciness: 0, 
		          easing:Easing.ease,
		          restSpeedThreshold: 1
		        }
		    ).start(()=>{
		  	  nextProps.parent.preSelectedKey =null;
		    })
		}else if(nextProps.animatetype==="noanimatedshow"){
			if(this.isShow){return;}
			this.state.openValue.setValue(1);
			nextProps.parent.preSelectedKey = nextProps.itemconfig.key;
			this.isShow = true;
		}else if(nextProps.animatetype==="noanimatedhide"){
			if(!this.isShow){return;}
		    this.isShow = false;
		    this.state.openValue.setValue(0);
			nextProps.parent.preSelectedKey =null;
		}
	}

	render(){
		var children = this.props.children;

		let popHeight = StyleSheet._px(StyleSheet.baseScreen.height);
		// if(children){
		// 	if(children.props.style&&children.props.style.height){
		// 		popHeight =parseFloat(children.props.style.height);
		// 	}
		// }
		// console.log(this.props.animatetype+" "+this.props.itemconfig.key)
		let drawerTranslateY = -popHeight;
		const animateStyle={};
		if(this.props.animatetype==="animatedshow"||this.props.animatetype==="animatedhide"){
			drawerTranslateY = this.state.openValue.interpolate({
			    inputRange: [0, 1],
			    outputRange:[0-popHeight,0],
			    extrapolate: 'clamp',
			});
			const opacity = this.state.openValue.interpolate({
				inputRange: [0, 1],
				outputRange: [.8, 1],
				extrapolate: 'clamp',
			});
			animateStyle.opacity = opacity;
		}else if(this.props.animatetype==="noanimatedhide"){

		}else if(this.props.animatetype==="noanimatedshow"){
			drawerTranslateY = 0;
		}
		animateStyle.transform = [{"translateY":drawerTranslateY}];
		return <Animated.View style={{...styles.layer,...animateStyle}}>
			{children}
		</Animated.View>
	}
}

export default PopLayer;