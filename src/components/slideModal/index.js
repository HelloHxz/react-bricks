import React from 'react';
import Animated from '../animated';
import Text from '../text'
import Modal from '../modal';
import Easing from '../easing';
import StyleSheet from "../style"
import TouchableWithoutFeedback from '../touchablewithoutfeedback'


function px(val){
	if(StyleSheet.isWeb){
		return val+"px";
	}
	return val;
}

export default class SildeModal extends React.Component{

	constructor(props){
		super(props);
		this.hasInitPopContent = false;
		this.state = {
			visible:props.visible,
			showValue:new Animated.Value(0)
		};
	}

	componentWillReceiveProps(nextProps){
      if(this.state.visible!==nextProps.visible){
        if(nextProps.visible===false){
          Animated.timing(
            this.state.showValue,
            {
              toValue: 0,
              duration:140,
              bounciness: 0, 
              easing:Easing.in(),
              restSpeedThreshold: 0.1
            }
          ).start(()=>{
            this.setState({
              visible:false
            })
          })
        }else{
          this.setState({
            visible:nextProps.visible
          });
        }
        
      }
  }


	onShow(){
	  Animated.timing(
	    this.state.showValue,
	    {
	      toValue: 1,
	      duration:140,
	      easing:Easing.ease,
	    }
	  ).start(()=>{
	  })
	}

	renderBK(){
		const overlayOpacity = this.state.showValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 0.15],
			extrapolate: 'clamp',
		});

		var bkLayer={
			backgroundColor: '#000',
			position:"absolute",
			top:0,
			left:0,
			right:0,
			bottom:0,
			opacity:overlayOpacity
		}

		return <TouchableWithoutFeedback onPress={this.bkPress.bind(this)} >
		    <Animated.View style={bkLayer}/>
		  </TouchableWithoutFeedback>;
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
	       if(!this.state.visible&&!this.hasInitPopContent){
	          return null;
	        }

	        this.hasInitPopContent = true;  
	        const drawerTranslateY = this.state.showValue.interpolate({
	          inputRange: [0, 1],
	          outputRange:[ StyleSheet._px(200),0],
	          extrapolate: 'clamp',
	        });
	  //       const op = this.state.showValue.interpolate({
			// 	inputRange: [0, 1],
			// 	outputRange: [.8, 1],
			// 	extrapolate: 'clamp',
			// });
	        wrapperStyle = {...wrapperStyle,...{
	          position:"absolute",
	          bottom:0,
	          zIndex:10,
	          transform:[{"translateY":drawerTranslateY}]
	        }}

	    return (
	        <Animated.View 
	        style={wrapperStyle}
	      >
	         {this.props.children}
	      </Animated.View>);
	  }



	bkPress(){
		if(this.props.onBackLayerClick){
		  this.props.onBackLayerClick();
		}
	}

	render(){
		// console.log(this.props.children);
		return <Modal
			onShow = {this.onShow.bind(this)}
			visible={this.state.visible}
			>
			{this.renderContent()}
			{this.renderBK()}
		</Modal>
	}
}