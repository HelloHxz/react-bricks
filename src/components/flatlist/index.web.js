
import React from 'react';
import View from '../view'
import ScrollView from '../scrollview'

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
			rows.push(<View key={this.props.keyExtractor(item,i)}>{
				this.props.renderItem({
					item:item
				})
			}</View>);
		}
		return <ScrollView {...this.props} onRefresh={()=>{}}>{rows}</ScrollView>
	}
} 