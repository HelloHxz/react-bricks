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
		var selectedKey = this.props.selectedKey||"";
		var selectedIndex = 0;
		var style = this.props.style||{};
		if(!style.height){
			style.flex = 1;
		}
		for(var i=0,j=this.state.data.length;i<j;i++){
			var itemdata = this.state.data[i];
			if(itemdata.key===selectedKey){
				selectedIndex = i;
				break;
			}
		}
		if(!style.backgroundColor){
			//android 没有这句会不触发拖拽事件
			style.backgroundColor = "transparent";
		}
		return <Swiper
			touchenable={false}
			cache={true}
			{...this.props}
			style={style}
			data={this.state.data}
			selectedIndex={selectedIndex}
			horizontal = {true}
			loop={false}
			lazyrender = {true}
		></Swiper>
	}
}

export default Container;