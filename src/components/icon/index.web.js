/* eslint-disable eol-last */
import React from 'react';
import './index.less';
import StyleSheet from '../style'
const Theme =require("../theme").default;
import View from '../view';
import Animated from '../animated'
import Common from './common'
import Easing from '../easing'

class Com extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			rotate:new Animated.Value(parseInt(props.rotate||0))
		};
	}
	createMarkup(_this,re) {
		var arr = [];
		for(var key in re.iconStyle){
			arr.push(key+":"+re.iconStyle[key]);
		}

		var icon = _this.props.icon||"";
		icon = icon.replace("<svg","<svg style='"+arr.join(";")+"'");
		if(!this.props.colorful){
			icon = icon.replace(/\sfill="#ef473a"/g,' fill="'+re.color+'"')
		}
		return {__html: icon};
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.rotate||nextProps.rotate===0){
			if(nextProps.rotate!==this.state.rotate){
			var to = nextProps.rotate||0;
	    	 Animated.spring(
					        this.state.rotate,
					        {
					          toValue: parseInt(to),
					          duration:30,
					          bounciness: 10, 
					          easing:Easing.inOut(Easing.in)
					        }
					      ).start(
					      	
					      )
		}
		}
		
	}

	render(){
		var Wrapper = View;
		var isAnimateView = false;
		if(this.props.rotate||this.props.rotate===0){
	      Wrapper = Animated.View;
	      isAnimateView = true
	    }

		var re = Common.getStyle(this.props,{
			rotate:this.state.rotate,
			isAnimateView:isAnimateView
		});

		
		return <Wrapper style={re.wrapperStyle} className='xz-icon-wrapper'><span className='xz-icon' dangerouslySetInnerHTML={this.createMarkup(this,re)}></span></Wrapper>
	}
}
export default Com;