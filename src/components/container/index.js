import React from 'react';
import View from '../view';
import Text from '../text';
import Swiper from '../swiper';


class Container extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data:props.data||[]
		};
	}

	render(){
		var style = this.props.style||{};
		if(!style.height){
			style.flex = 1;
		}
		if(!style.backgroundColor){
			//android 没有这句会不触发拖拽事件
			style.backgroundColor = "transparent";
		}
		return <Swiper
			{...this.props}
			style={style}
			data={this.state.data}
			horizontal = {true}
			loop={false}
			lazyload = {true}
		></Swiper>
	}
}

export default Container;