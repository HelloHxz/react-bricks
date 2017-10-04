
import React from 'react';
import View from '../view'
import './index.less'

export default class FlatList extends React.Component{

	constructor(props){
		super(props);
		this.state={
			data:props.data||[]
		}
	}

	render(){
		var rows = [];
		for(var i=0,j=this.state.data.length;i<j;i++){
			var item = this.state.data[i];
			rows.push(<div key={this.props.keyExtractor(item,i)}>{
				this.props.renderItem({
					item:item
				})
			}</div>);
		}
		return <View className='xz-flatlist' style={{flex:1,overflow:"auto"}}>{rows}</View>
	}
} 